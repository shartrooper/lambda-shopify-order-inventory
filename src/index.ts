import inventory from "./intentory";
import logger from "./logger";
import { LineItems } from "./types";

exports.handler = async (event: { body?: string }) => {

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
};