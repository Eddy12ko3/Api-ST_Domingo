import { type AuthWorker } from './auth-workers.interface';

export interface Workers extends AuthWorker {
	nombre: string;
}
