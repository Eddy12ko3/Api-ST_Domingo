import { type Request, type Response } from 'express';
import { workersService } from '../services/trabajadores.service';
import { handleHttp } from '../utils/err.handle';

class WorkersController {
	private static instance: WorkersController;
	public static getinstance(): WorkersController {
		if (!WorkersController.instance) {
			this.instance = new WorkersController();
		}
		return this.instance;
	}

	async LoginWorker(req: Request, res: Response) {
		try {
			const { dni, password } = req.body;
			const response = await workersService.LogWorker({
				dni,
				password,
			});
			return res.status(200).json(response);
		} catch (e: any) {
			handleHttp(res, 'ERR_LOGIN_WORKER', e.message);
		}
	}

	async PostWorker(req: Request, res: Response) {
		try {
			const { dni, nombre, password } = req.body;
			const response = await workersService.InsertWorker({
				dni,
				nombre,
				password,
			});
			return res.status(200).json({
				message: 'trabajador insertado correctamente',
			});
		} catch (e: any) {
			handleHttp(res, 'ERR_POST_WORKER', e.message);
		}
	}

	async GetWorkers(req: Request, res: Response) {
		try {
			const response = await workersService.GetWorkers();
			if (response) {
				return res.status(200).json(response);
			} else {
				return res.status(404).json({
					message: 'No hay registros',
				});
			}
		} catch (e: any) {
			handleHttp(res, 'ERR_GET_WORKERS', e.message);
		}
	}

	async UpdateWorker(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const { dni, nombre, password } = req.body;
			const response = await workersService.UpdateWorker(id, {
				dni,
				nombre,
				password,
			});
			if (response) {
				return res.status(200).json(response);
			} else {
				return res.status(404).json({ message: 'No hay registros' });
			}
		} catch (e: any) {
			handleHttp(res, 'ERR_UPDATE_WORKERS', e.message);
		}
	}

	async DeleteWorker(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const response = await workersService.DeleteWorker(id);
			if (response) {
				res.status(200).json({ message: 'Trabajador borrado correctamente' });
			} else {
				res.status(404).json({ message: 'Trabajador not found' });
			}
		} catch (e: any) {
			handleHttp(res, 'ERR_DELETE_WORKERS', e.message);
		}
	}
}

export const workerController = WorkersController.getinstance();
