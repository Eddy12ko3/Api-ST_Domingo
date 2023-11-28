import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { router } from './routes';
import { AppDataSource } from './app.config';
import { genderService } from './services/genero.service';
import { tipoDocumentoService } from './services/tipo_document.service';
import { operatorService } from './services/operador.service';
import { fieldsService } from './services/rubros.service';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.disable('X-Powered-By');

AppDataSource.initialize()
	.then(async () => {
		genderService.InsertGenero([
			'masculino', 
			'femenino'
		].map(
			(gender) => (
				{ description: gender}
				)
			));
		tipoDocumentoService.InsertTipoDoc([
			'dni', 
			'carnet de extranjeria', 
			'pasaporte'
		].map(
			(description) => (
				{description: description}
				)
			));
		operatorService.InsertOperators([
			'bitel', 
			'entel', 
			'movistar', 
			'claro'
		].map(
			(name) => (
				{nameOperator: name}
				)
			));
		fieldsService.InsertField([
			'Abarrotes', 
			'Bazar', 
			'Carnes', 
			'Comedores', 
			'Embutidos', 
			'Frutas', 
			'Golosinas', 
			'Jugueria', 
			'Mayorista', 
			'Miscaleno', 
			'Pasamaneria', 
			'Pescado', 
			'Pollo', 
			'Porcino', 
			'Tiendas', 
			'Tuberculos'
		].map(field => (
			{nameField: field}
			)
		))
		console.info('---->Database Connected<-----');
	})
	.catch((err) => {
		throw new Error(err);
	});

app.use(router);
app.listen(PORT, () => {
	console.log(`Listening for the Port http://localhost:${PORT}`);
});
