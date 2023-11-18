import { parseNumber, parseString } from "./helper"
import logger from "./logger"
import { CURRENCY_CODE, PayloadItem } from "./types"

export interface Item {
	id: number
	product_id: number
	price: string
	name: string
	inventory_level: number
	created: Date
	updated: Date
}

class Inventory {
	private items: Item[] = []

	constructor() { }

	get() { return this.items; }

	validate(record: Record<string, unknown>) {

		const parsedData: PayloadItem = {
			name: parseString(record.name, 'name'),
			product_id: parseNumber(record.product_id),
			quantity: parseNumber(record.quantity),
			price: parseString(record.price, 'price')
		};

		return parsedData;
	}

	map(payload: Record<string, unknown>[]) {

		const validatedPayloadItems: PayloadItem[] = payload.map(item => this.validate(item));

		for (const payloadItem of validatedPayloadItems) {
			const found = this.items.find(item => item.product_id === payloadItem.product_id);
			if (found) {
				const updatedItem = this.update(payloadItem, found);
				this.items = [...this.items.filter(item => item.product_id !== found.product_id), updatedItem];
				logger.setLogMessage('updated', `ITEM: ${updatedItem.name}, PRICE:${updatedItem.price} ${CURRENCY_CODE}, INVENTORY LEVEL: ${updatedItem.inventory_level} `);
			} else {
				const createdItem = this.create(payloadItem);
				logger.setLogMessage('created', `ITEM: ${createdItem.name}, PRICE:${createdItem.price} ${CURRENCY_CODE}, INVENTORY LEVEL: ${createdItem.inventory_level} `);
				this.items = [...this.items, createdItem];
			}
		}

		this.items.sort((a, b) => a.id > b.id ? 1 : -1);

	}

	create(payloadItem: PayloadItem) {
		const id = this.items.length + 1;
		const { product_id, price, name, quantity: inventory_level } = payloadItem;
		return {
			id,
			product_id,
			price,
			name,
			inventory_level,
			created: new Date(),
			updated: new Date()
		}
	}

	update(payloadItem: PayloadItem, target: Item) {
		return {
			...target,
			inventory_level: target.inventory_level + payloadItem.quantity,
			price: payloadItem.price,
			updated: new Date()
		}
	}

}

const inventory = new Inventory();

export default inventory;