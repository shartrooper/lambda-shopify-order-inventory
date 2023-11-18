import logger from "./logger";

const isString = (text: unknown): text is string => {
	return typeof text === 'string' || text instanceof String; //to make absolutely sure It's a string
};

const isNumber = (value: unknown): value is number => typeof value === 'number';

export const parseNumber = (value: unknown): number => {
	if (!isNumber(value)) {
		throw logger.error('Provided value is not a number');
	}
	return value;
};

export const parseString = (value: unknown, key: string): string => {
	if (!value || !isString(value)) {
		throw logger.error(`Incorrect or missing property: ${key}`);
	}
	return value;
};