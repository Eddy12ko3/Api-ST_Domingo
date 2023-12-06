import { AppDataSource } from '../app.config';
import { type DetailPayment } from '../interfaces/pagos.interface';
import { DetailPaymentDB } from '../models/detalle_pago';
import { PersonaDB } from '../models/persona';

class DetailPaymentService {
	private static instance: DetailPaymentService;
	public static getInstance(): DetailPaymentService {
		if (!DetailPaymentService.instance) {
			this.instance = new DetailPaymentService();
		}
		return this.instance;
	}

	constructor() {}

	async InsertDetailPayment({ datepayment, amount, person }: DetailPayment) {
		try {
			const personObj = await AppDataSource.getRepository(PersonaDB).findOne({
				where: {
					personId: person,
				},
			});
			if (!personObj) throw new Error('Persona no encontrada');

			const newPayment = new DetailPaymentDB();
			newPayment.datePayment = datepayment;
			newPayment.amount = amount;
			newPayment.person = personObj;

			const response = await AppDataSource.getRepository(DetailPaymentDB).save(newPayment);
			return response;
		} catch (e: any) {
			throw new Error(e.message);
		}
	}

	async GetDetailPayment() {
		try {
			const response = await AppDataSource.getRepository(DetailPaymentDB).find({
				relations: {
					person: true,
				},
				select: {
					person: {
						name: true,
						lastname: true,
						date_birth: true,
					},
				},
			});
			return response;
		} catch (e: any) {
			throw new Error(e.message);
		}
	}

	async UpdateDetailPayment(id: string, { datepayment, amount, person }: DetailPayment) {
		try {
			const personObj = await AppDataSource.getRepository(PersonaDB).findOne({
				where: {
					personId: person,
				},
			});
			if (!personObj) throw new Error('Persona no encontrada');

			const detailPaymentObj = await AppDataSource.getRepository(DetailPaymentDB).findOne({
				where: {
					detailPaymentId: parseInt(id),
				},
			});
			if (!detailPaymentObj) throw new Error('Pagos no encontrados');

			detailPaymentObj.datePayment = datepayment;
			detailPaymentObj.amount = amount;
			detailPaymentObj.person = personObj;

			const response =
				await AppDataSource.getRepository(DetailPaymentDB).save(detailPaymentObj);
			return response;
		} catch (e: any) {
			throw new Error(e.message);
		}
	}

	async DeleteDetailPayment(id: string) {
		try {
			const paymentdelete = await AppDataSource.getRepository(DetailPaymentDB).findOne({
				where: {
					detailPaymentId: parseInt(id),
				},
			});
			if (!paymentdelete) throw new Error('Pagos no encontrados');

			const response =
				await AppDataSource.getRepository(DetailPaymentDB).remove(paymentdelete);
			return response;
		} catch (e: any) {
			throw new Error(e.message);
		}
	}
}

export const detailPaymentService = DetailPaymentService.getInstance();
