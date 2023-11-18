import inventory, { Item } from "./intentory";
import logger from "./logger";
import { LineItems } from "./types";

const MAX_RETRIES = 3;
const DELAY = 1000;

const processEvent = async (event: { body?: string }, retryCount: number = 0): Promise<{ statusCode: number, items: Item[] }> => {
	try {

		if (!event.body) {
			throw new Error('Request does not have expected body\'s payload !');
		}

		const { line_items: lineItems } = JSON.parse(event.body) as LineItems;

		if (!lineItems?.length) {
			throw new Error('Empty orders cant be processed.');
		}

		inventory.map(lineItems);

		logger.info(` - New order placed on ${new Date().toDateString()} -`);

		logger.getCreatedStatusLogs();

		logger.getUpdatedStatusLogs();

		logger.clear();

		const response = {
			statusCode: 200,
			items: inventory.get(),
		};

		return response;

	} catch (error) {
		console.error('Error processing event:', error);

		if (retryCount < MAX_RETRIES) {
			const delay = Math.pow(2, retryCount) * DELAY;
			console.info(`Retrying in ${delay / 1000} seconds...`);

			await new Promise(resolve => setTimeout(resolve, delay));

			return processEvent(event, retryCount + 1);
		} else {
			throw logger.error('All retries attempted. Event couldnt be processed');
		}

	}
};

exports.handler = async (event: { body?: string }) => {
	return processEvent(event);
};
