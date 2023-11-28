export interface Producto {
	code: string;
	name: string;
	details: string;
	marca: string;
	unit: string;
	priceDistributor: number;
	priceProduct: number;
	image: string;
	commission: number;
	tax: boolean;
	expired: boolean;
	stock_min: number;
	stock_max: number;
	status: boolean;
}
