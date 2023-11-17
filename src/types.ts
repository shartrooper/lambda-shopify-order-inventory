export const CURRENCY_CODE = "USD";

export interface PayloadItem {
	product_id: string,
	name: string,
	quantity: number,
	price: string
}

export interface LineItems {
	line_items: PayloadItem[]
}