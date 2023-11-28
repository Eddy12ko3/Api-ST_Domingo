import { type Request, type Response } from 'express';
import { associateService } from '../services/asociados.service';
import { handleHttp } from '../utils/err.handle';

class AssociateController {
	private static instance: AssociateController;
	public static getInstance(): AssociateController {
		if (!AssociateController.instance) {
			this.instance = new AssociateController();
		}
		return this.instance;
	}

	postAssociates = async (req: Request, res: Response) => {
		try {
			const {
				folio,
				numDocument,
				name,
				lastname,
				date_birth,
				gender,
				document,
				direccion,
				celular,
				operador,
				code,
				area,
				sector,
				rubro,
			} = req.body;
			const response = await associateService.InsertAssociate({
				folio,
				numDocument,
				name,
				lastname,
				date_birth,
				gender,
				document,
				direccion,
				celular,
				operador,
				code,
				area,
				sector,
				rubro,
			});
			if (response) {
				console.log(response);
				res.status(200).json({
					success: 'Asociado agregado Correctamente',
				});
			} else {
				res.status(404).json({
					error: 'Error al agregar un asociado',
				});
			}
		} catch (e: any) {
			handleHttp(res, 'Error al agregar el asociado', e.message);
		}
	};

	getAssociate = async (req: Request, res: Response) => {
		try {
		} catch (e: any) {
			handleHttp(res, 'Error al obtener el registro', e.message);
		}
	};

	getAssociates = async (req: Request, res: Response) => {
		try {
			const response = await associateService.GetAssociates();
			if (response.length > 0) {
				return res.status(200).json(response);
			} else {
				return res.json({ message: 'No hay registros' });
			}
		} catch (e: any) {
			handleHttp(res, 'Error al obtener los registros', e.message);
		}
	};

	updateAssociates = async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			const {
				folio,
				numDocument,
				name,
				lastname,
				date_birth,
				gender,
				document,
				direccion,
				celular,
				operador,
				code,
				area,
				sector,
				rubro,
			} = req.body;
			const response = await associateService.UpdateAssociates(id, {
				folio,
				numDocument,
				name,
				lastname,
				date_birth,
				gender,
				document,
				direccion,
				celular,
				operador,
				code,
				area,
				sector,
				rubro,
			});
			if (response) {
				res.status(200).json({
					success: 'Asociado modificado correctamente',
				});
			} else {
				res.status(404).json({
					error: 'Error al modificar un asociado',
				});
			}
		} catch (e: any) {
			handleHttp(res, 'Error al modificar el asociado', e.message);
		}
	};

	deleteAssociates = async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			const response = await associateService.DeleteAssociate(id);
			if (response) {
				res.status(200).json({
					success: 'Asociado borrado correctamente',
				});
			} else {
				res.status(404).json({
					error: 'Error al eliminar un asociado',
				});
			}
		} catch (e: any) {
			handleHttp(res, 'Error al eliminar el asociado', e.message);
		}
	};
}

export const associateController = AssociateController.getInstance();
