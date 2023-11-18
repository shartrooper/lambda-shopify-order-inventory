import { expect } from 'chai';
import { describe, it } from 'mocha';
import inventory, { Item } from '../src/intentory';

describe('Inventory Class', () => {

	const mockItems = [
		{
			"name": "The Videographer Snowboard",
			"price": "885.95",
			"product_id": 7669068562627,
			"quantity": 1,
		},
		{
			"name": "The Collection Snowboard: Hydrogen",
			"price": "600.00",
			"product_id": 7669068595395,
			"quantity": 1,
		}
	] as const;

	it('should create an item', () => {
		const [mockItem] = mockItems;
		const createdItem = inventory.create(mockItem);

		expect(createdItem).to.have.property('id');
		expect(createdItem.product_id).to.equal(mockItem.product_id);
		expect(createdItem.name).to.equal(mockItem.name);
		expect(createdItem.inventory_level).to.equal(mockItem.quantity);
	});

	it('should update an existing item', () => {
		const [, existingItem] = mockItems;

		const targetItem = {
			"id": 1,
			"name": "The Collection Snowboard: Hydrogen",
			"price": "600.00",
			"product_id": 7669068595395,
			"inventory_level": 1,
			"created": new Date(),
			"updated": new Date()
		} satisfies Item;

		const updatedItem = inventory.update(existingItem, targetItem);
		expect(updatedItem.product_id).to.equal(existingItem.product_id);
		expect(updatedItem.name).to.equal(targetItem.name);
		expect(updatedItem.inventory_level).to.equal(existingItem.quantity + targetItem.inventory_level);
	});

	it('should validate payload data', () => {
		// Call validate method with valid and invalid data
		const validPayload: Record<string, unknown> = { product_id: 1, name: 'Test Item', quantity: 5, price: '10.99' };
		const invalidPayload: Record<string, unknown> = { product_id: 'invalid', name: 123, quantity: 'invalid', price: 'invalid' };

		const validatedData = inventory.validate(validPayload);

		// Assert that the valid data is returned
		expect(validatedData.product_id).to.equal(validPayload.product_id);
		expect(validatedData.name).to.equal(validPayload.name);
		expect(validatedData.quantity).to.equal(validPayload.quantity);
		expect(validatedData.price).to.equal(validPayload.price);

		// Assert that the invalid data throws an error
		expect(() => inventory.validate(invalidPayload)).to.throw('Incorrect or missing property');
	});

});