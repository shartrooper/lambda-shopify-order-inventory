import logger from "./logger";
import { LineItems } from "./types";

exports.handler = async (event: { body?: string }) => {

	if (!event.body) {
		throw logger.error('Request does not have expected body\'s payload !');
	}

	const { line_items: lineItems } = JSON.parse(event.body) as LineItems;

	logger.info('PARSED BODY ITEMS!');

	for (const lineItem of lineItems) {
		logger.info(`Sold ${lineItem.quantity} ${lineItem.name} item${lineItem.quantity > 1 && 's'}`);
	}

	const response = {
		statusCode: 200,
		items: lineItems,
	};

	return response;
};