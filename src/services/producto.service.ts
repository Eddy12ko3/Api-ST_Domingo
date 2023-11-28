import { AppDataSource } from '../app.config';
import { type Producto } from '../interfaces/productos.interface';
import { ProductoDB } from '../models/producto';

class ProductService {
	private static instance: ProductService;
	public static getinstance(): ProductService {
		if (!ProductService.instance) {
			this.instance = new ProductService();
		}
		return this.instance;
	}

	constructor() {}

	InsertProduct = async ({
		code,
		name,
		details,
		marca,
		unit,
		priceDistributor,
		priceProduct,
		image,
		commission,
		tax,
		expired,
		stock_max,
		stock_min,
		status,
	}: Producto) => {
		try {
			const newProduct = new ProductoDB();
			newProduct.code = code;
			newProduct.name = name;
			newProduct.details = details;
			newProduct.marca = marca;
			newProduct.unit = unit;
			newProduct.priceDistributor = priceDistributor;
			newProduct.priceProduct = priceProduct;
			newProduct.image = image;
			newProduct.commission = commission;
			newProduct.tax = tax;
			newProduct.expired = expired;
			newProduct.stock_min = stock_min;
			newProduct.stock_max = stock_max;
			newProduct.status = status;

			const responseInsert = await AppDataSource.getRepository(ProductoDB).save(newProduct);
			return responseInsert;
		} catch (e: any) {
			throw new Error(e.message);
		}
	};

	GetProducts = async () => {
		try {
			const responseProducts = await AppDataSource.getRepository(ProductoDB).find();
			return responseProducts;
		} catch (e: any) {
			throw new Error(e.message);
		}
	};

	GetProduct = async (id: string) => {
		try {
			const responseProduct = await AppDataSource.getRepository(ProductoDB).findOne({
				where: { productoId: parseInt(id) },
			});

			if (!responseProduct) throw new Error('PRODUCT_NOT_FOUND');

			return responseProduct;
		} catch (e: any) {
			throw new Error(e.message);
		}
	};

	UpdateProduct = async (
		id: string,
		{
			code,
			name,
			details,
			marca,
			unit,
			priceDistributor,
			priceProduct,
			image,
			commission,
			tax,
			expired,
			stock_max,
			stock_min,
			status,
		}: Producto,
	) => {
		try {
			const productObj = await AppDataSource.getRepository(ProductoDB).findOne({
				where: { productoId: parseInt(id) },
			});

			if (!productObj) throw new Error('PRODUCT_NOT_FOUND');

			productObj.code = code;
			productObj.name = name;
			productObj.details = details;
			productObj.marca = marca;
			productObj.unit = unit;
			productObj.priceDistributor = priceDistributor;
			productObj.priceProduct = priceProduct;
			productObj.image = image;
			productObj.commission = commission;
			productObj.tax = tax;
			productObj.expired = expired;
			productObj.stock_min = stock_min;
			productObj.stock_max = stock_max;
			productObj.status = status;

			const responseUpdate = await AppDataSource.getRepository(ProductoDB).save(productObj);
			return responseUpdate;
		} catch (e: any) {
			throw new Error(e.message);
		}
	};

	DeleteProduct = async (id: string) => {
		try {
			const productDelete = await AppDataSource.getRepository(ProductoDB).findOne({
				where: { productoId: parseInt(id) },
			});

			if (!productDelete) throw new Error('PRODUCT_NOT_FOUND');
			const responseDelete =
				await AppDataSource.getRepository(ProductoDB).remove(productDelete);
			return responseDelete;
		} catch (e: any) {
			throw new Error(e.message);
		}
	};
}

export const productService = ProductService.getinstance();
