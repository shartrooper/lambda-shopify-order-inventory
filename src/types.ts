export const CURRENCY_CODE = "USD";

export interface PayloadItem {
	product_id: number,
	name: string,
	quantity: number,
	price: string
}

export interface LineItems {
	line_items?: Record<string, unknown>[]
}