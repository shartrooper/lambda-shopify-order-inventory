import { expect } from 'chai';
import { describe, it } from 'mocha';
import logger from '../src/logger';

describe('Logger Class', () => {
	it('should log messages', () => {
		let loggedMessages: string[] = [];
		console.log = (message: string) => loggedMessages.push(message);

		logger.info('Test Info Message');

		expect(loggedMessages).to.include('Test Info Message');
	});

	it('should set log messages for created and updated', () => {
		logger.setLogMessage('created', 'Item Created Message');
		logger.setLogMessage('updated', 'Item Updated Message');

		expect(logger['logCollection'].created).to.include('Item Created Message');
		expect(logger['logCollection'].updated).to.include('Item Updated Message');
	});

});