import { type Request, type Response } from 'express';
import { handleHttp } from '../utils/err.handle';
import { personService } from '../services/persona.service';

class PersonController {
	private static instance: PersonController;
	public static getInstance(): PersonController {
		if (!PersonController.instance) {
			this.instance = new PersonController();
		}
		return this.instance;
	}

	async GetPersons(req: Request, res: Response) {
		try {
			const response = await personService.GetPersons();
			res.status(200).json(response);
		} catch (e: any) {
			handleHttp(res, 'Error al obtener los registos', e.message);
		}
	}
}

export const personController = PersonController.getInstance();
