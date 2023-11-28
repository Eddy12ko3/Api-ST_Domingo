import { type Request, type Response } from 'express';
import { handleHttp } from '../utils/err.handle';
import { productService } from '../services/producto.service';

class ProductController {
	private static instance: ProductController;
	public static getinstance(): ProductController {
		if (!ProductController.instance) {
			this.instance = new ProductController();
		}
		return this.instance;
	}

	getProduct = async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			const response = await productService.GetProduct(id);
			if (response) {
				return res.status(200).json(response);
			} else {
				return res.json({ message: 'registro no encontrado' });
			}
		} catch (e: any) {
			handleHttp(res, 'ERR_GET_PRODUCT', e.message);
		}
	};

	getProducts = async (req: Request, res: Response) => {
		try {
			const response = await productService.GetProducts();
			if (response) {
				return res.status(200).json(response);
			} else {
				return res.json({ message: 'No hay registros' });
			}
		} catch (e: any) {
			handleHttp(res, 'ERR_GET_PRODUCTS', e.message);
		}
	};

	updateProduct = async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			const {
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
				stock_min,
				stock_max,
				status,
			} = req.body;
			const response = await productService.UpdateProduct(id, {
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
				stock_min,
				stock_max,
				status,
			});
			if (response) {
				res.status(200).json({ success: 'modificado correctamente' });
			} else {
				res.status(500).json({ error: 'error updating product' });
			}
		} catch (e: any) {
			handleHttp(res, 'ERR_UPDATE_PRODUCT', e.message);
		}
	};

	postProduct = async (req: Request, res: Response) => {
		try {
			const {
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
				stock_min,
				stock_max,
				status,
			} = req.body;
			const response = await productService.InsertProduct({
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
				stock_min,
				stock_max,
				status,
			});
			return res.status(200).json({ message: 'producto insertado correctamente' });
		} catch (e: any) {
			handleHttp(res, 'ERR_POST_PRODUCT', e.message);
		}
	};

	deleteProduct = async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			const response = await productService.DeleteProduct(id);
			if (response) {
				res.status(200).json({ message: 'Producto borrado correctamente' });
			} else {
				res.status(404).json({ message: 'Product not found' });
			}
		} catch (e: any) {
			handleHttp(res, 'ERR_DELETE_PRODUCT', e.message);
		}
	};
}

export const productController = ProductController.getinstance();
