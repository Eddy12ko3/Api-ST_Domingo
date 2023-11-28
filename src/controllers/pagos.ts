import { type Request, type Response } from 'express';
import { detailPaymentService } from '../services/pagos.service';
import { handleHttp } from '../utils/err.handle';

class DetailPaymentController {
	private static instance: DetailPaymentController;
	public static getInstance(): DetailPaymentController {
		if (!DetailPaymentController.instance) {
			this.instance = new DetailPaymentController();
		}
		return this.instance;
	}

	async InsertPayment(req: Request, res: Response) {
		try {
			const { datepayment, amount, person } = req.body;
			const response = await detailPaymentService.InsertDetailPayment({
				datepayment,
				amount,
				person,
			});
			if (response) {
				res.status(200).json({
					success: 'El registro ha sido insertado correctamente',
				});
			} else {
				res.status(404).json({
					error: 'Error al registrar el registro',
				});
			}
		} catch (e: any) {
			handleHttp(res, 'Error al registar un pago', e.message);
		}
	}

	async GetPayment(req: Request, res: Response) {
		try {
			const response = await detailPaymentService.GetDetailPayment();
			if (response.length > 0) {
				return res.status(200).json(response);
			} else {
				return res.json({ message: 'No hay registros' });
			}
		} catch (e: any) {
			handleHttp(res, 'Error al obtener los registros', e.message);
		}
	}

	async UpdatePayment(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const { datepayment, amount, person } = req.body;
			const response = await detailPaymentService.UpdateDetailPayment(id, {
				datepayment,
				amount,
				person,
			});
			if (response) {
				res.status(200).json({
					success: 'El registro ha sido modificado correctamente',
				});
			} else {
				res.status(404).json({
					error: 'Error al modificar el registro',
				});
			}
		} catch (e: any) {
			handleHttp(res, 'Error al modificar el registro de pagos', e.message);
		}
	}

	async DeletePayment(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const response = await detailPaymentService.DeleteDetailPayment(id);
			if (response) {
				res.status(200).json({
					success: 'El registro ha sido eliminado correctamente',
				});
			} else {
				res.status(404).json({
					error: 'Error al eliminar el registro',
				});
			}
		} catch (e: any) {
			handleHttp(res, 'Error al eliminar el registro de pagos', e.message);
		}
	}
}

export const detailPaymentController = DetailPaymentController.getInstance();
