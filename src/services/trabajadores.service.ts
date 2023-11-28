import { AppDataSource } from '../app.config';
import { type AuthWorker } from '../interfaces/auth-workers.interface';
import { type Workers } from '../interfaces/trabajadores';
import { WorkersDB } from '../models/trabajadores';
import { encrypt, verified } from '../utils/bcrypt.handle';
import { generateToken } from '../utils/jwt.handle';

class WorkersService {
	private static instance: WorkersService;
	public static getInstance(): WorkersService {
		if (!WorkersService.instance) {
			this.instance = new WorkersService();
		}
		return this.instance;
	}

	async InsertWorker({ dni, nombre, password }: Workers) {
		try {
			const newWorker = new WorkersDB();
			newWorker.dni = dni;
			newWorker.nombre = nombre;

			const passHash = await encrypt(password);
			newWorker.password = passHash;

			const responseInsert = await AppDataSource.getRepository(WorkersDB).save(newWorker);
			return responseInsert;
		} catch (e: any) {
			throw new Error(e.message);
		}
	}

	async LogWorker({ dni, password }: AuthWorker) {
		const user = await AppDataSource.getRepository(WorkersDB).findOneBy({
			dni,
		});
		if (!user) throw new Error('WORKER_NOT_FOUND');

		const passwordHash = user.password;
		const isCorrect = await verified(password, passwordHash);

		if (!isCorrect) throw new Error('PASSWORD_INCORRECT');

		const token = generateToken(user.dni.toString());

		return token;
	}

	async GetWorkers() {
		try {
			const responseWorkers = await AppDataSource.getRepository(WorkersDB).find();
			return responseWorkers;
		} catch (e: any) {
			throw new Error(e.message);
		}
	}

	async UpdateWorker(id: string, { dni, nombre, password }: Workers) {
		try {
			const workerObj = await AppDataSource.getRepository(WorkersDB).findOne({
				where: {
					workedId: parseInt(id),
				},
			});
			if (!workerObj) throw new Error('WORKER_NOT_FOUND');

			workerObj.dni = dni;
			workerObj.nombre = nombre;
			workerObj.password = password;

			const responseUpdate = await AppDataSource.getRepository(WorkersDB).save(workerObj);
			return responseUpdate;
		} catch (e: any) {
			throw new Error(e.message);
		}
	}

	async DeleteWorker(id: string) {
		try {
			const workerDelete = await AppDataSource.getRepository(WorkersDB).findOne({
				where: {
					workedId: parseInt(id),
				},
			});
			if (!workerDelete) throw new Error('WORKER_NOT_FOUND');

			const responseDelete =
				await AppDataSource.getRepository(WorkersDB).remove(workerDelete);
			return responseDelete;
		} catch (e: any) {
			throw new Error(e.message);
		}
	}
}

export const workersService = WorkersService.getInstance();
