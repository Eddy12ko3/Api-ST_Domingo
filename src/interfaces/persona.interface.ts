import { type Stands } from './puesto.interface';

export interface Person extends Stands {
	name: string;
	lastname: string;
	date_birth: Date;
	gender: number;
	document: number;
	direccion: string;
	celular: number;
	operador: number;
}
