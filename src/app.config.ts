import { DataSource } from 'typeorm';
import { UserDB } from './models/user';
import { ProductoDB } from './models/producto';
import { PersonaDB } from './models/persona';
import { SexoDB } from './models/sexo';
import { TipoDocumentoDB } from './models/tipo_documento';
import { CellPhoneDB } from './models/celular';
import { FieldsDB } from './models/rubros';
import { AddressDB } from './models/direccion';
import { SectorDB } from './models/sector';
import { AreasMTSDB } from './models/areas';
import { StandsDB } from './models/puestos';
import { AssociatesDB } from './models/asociados';
import { DetailPaymentDB } from './models/detalle_pago';
import { WorkersDB } from './models/trabajadores';
import { NumdocumentDB } from './models/n_documento';
import { OperatorDB } from './models/operador';

export const AppDataSource = new DataSource({
	type: 'mysql',
	host: process.env.DB_HOST,
	port: parseInt(process.env.PORT_DB!, 10),
	username: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
	synchronize: true,
	logging: false,
	entities: [
		UserDB,
		ProductoDB,
		PersonaDB,
		SexoDB,
		TipoDocumentoDB,
		CellPhoneDB,
		FieldsDB,
		AddressDB,
		SectorDB,
		AreasMTSDB,
		StandsDB,
		AssociatesDB,
		DetailPaymentDB,
		WorkersDB,
		NumdocumentDB,
		OperatorDB,
	],
	subscribers: [],
	migrations: [],
});
