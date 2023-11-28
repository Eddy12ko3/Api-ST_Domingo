import { AppDataSource } from '../app.config';
import { type Associate } from '../interfaces/asociados.interface';
import { AreasMTSDB } from '../models/areas';
import { AssociatesDB } from '../models/asociados';
import { CellPhoneDB } from '../models/celular';
import { DetailPaymentDB } from '../models/detalle_pago';
import { AddressDB } from '../models/direccion';
import { NumdocumentDB } from '../models/n_documento';
import { OperatorDB } from '../models/operador';
import { PersonaDB } from '../models/persona';
import { StandsDB } from '../models/puestos';
import { FieldsDB } from '../models/rubros';
import { SectorDB } from '../models/sector';
import { SexoDB } from '../models/sexo';
import { TipoDocumentoDB } from '../models/tipo_documento';

class AssociateService {
	private static instance: AssociateService;
	public static getInstance(): AssociateService {
		if (!AssociateService.instance) {
			this.instance = new AssociateService();
		}
		return this.instance;
	}

	InsertAssociate = async ({
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
	}: Associate) => {
		try {
			const checksIs = await AppDataSource.getRepository(NumdocumentDB).findOneBy({
				numDocument,
			});
			if (checksIs) throw new Error('Este asociado ya ha sido registrado');

			const genderObj = await AppDataSource.getRepository(SexoDB).findOne({
				where: {
					genderId: gender,
				},
			});
			if (!genderObj) throw new Error('Genero no encontrado');

			const documentObj = await AppDataSource.getRepository(TipoDocumentoDB).findOne({
				where: {
					tipoDocId: document,
				},
			});
			if (!documentObj) throw new Error('Documento no encontrado');

			const operatorObj = await AppDataSource.getRepository(OperatorDB).findOne({
				where: {
					operatorId: operador,
				},
			});
			if (!operatorObj) throw new Error('Operador no encontrado');

			const fieldObj = await AppDataSource.getRepository(FieldsDB).findOne({
				where: {
					fieldId: rubro
				},
			})
			if(!fieldObj) throw new Error('Rubro no encontrado');

			const newnumDocument = new NumdocumentDB();
			newnumDocument.numDocument = numDocument;
			newnumDocument.tipoDocumento = documentObj;

			const newDireccion = new AddressDB();
			newDireccion.description = direccion;

			const newcelular = new CellPhoneDB();
			newcelular.cellNumber = celular;
			newcelular.operators = operatorObj;

			const newArea = new AreasMTSDB();
			newArea.size = area;

			const newSector = new SectorDB();
			newSector.code = sector;

			const newStand = new StandsDB();
			newStand.code = code;
			newStand.areas = newArea;
			newStand.sector = newSector;
			newStand.rubro = fieldObj;

			const newPerson = new PersonaDB();
			newPerson.name = name;
			newPerson.lastname = lastname;
			newPerson.date_birth = date_birth;
			newPerson.gender = genderObj;
			newPerson.stands = [newStand];

			newPerson.addresses = [newDireccion];
			newPerson.cellPhones = [newcelular];

			const newAssociate = new AssociatesDB();
			newAssociate.folio = folio;
			newAssociate.numDocument = newnumDocument;
			newAssociate.persons = newPerson;

			const responseInsert =
				await AppDataSource.getRepository(AssociatesDB).save(newAssociate);
			return responseInsert;
		} catch (e: any) {
			throw new Error(e.message);
		}
	};

	GetAssociates = async () => {
		try {
			const responseAssociates = await AppDataSource.getRepository(AssociatesDB).find({
				relations: {
					numDocument: {
						tipoDocumento: true,
					},
					persons: {
						addresses: true,
						gender: true,
						cellPhones: {
							operators: true,
						},
						stands: {
							areas: true,
							sector: true,
							rubro: true,
						},
					},
				},
			});

			return responseAssociates;
		} catch (e: any) {
			throw new Error(e.message);
		}
	};

	UpdateAssociates = async (
		id: string,
		{
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
		}: Associate,
	) => {
		try {
			const genderObj = await AppDataSource.getRepository(SexoDB).findOne({
				where: {
					genderId: gender,
				},
			});

			if (!genderObj) throw new Error('Genero no encontrado');

			const documentObj = await AppDataSource.getRepository(TipoDocumentoDB).findOne({
				where: {
					tipoDocId: document,
				},
			});

			if (!documentObj) throw new Error('Documento no encontrado');

			const operatorObj = await AppDataSource.getRepository(OperatorDB).findOne({
				where: {
					operatorId: operador,
				},
			});

			if (!operatorObj) throw new Error('Operador no encontrado');

			const fieldObj = await AppDataSource.getRepository(FieldsDB).findOne({
				where: {
					fieldId: rubro
				},
			})
			if(!fieldObj) throw new Error('Rubro no encontrado');

			const addressesObj = await AppDataSource.getRepository(AddressDB).findOne({
				where: {
					addressId: parseInt(id),
				},
			});
			if (!addressesObj) throw new Error('Direccion no encontrada');

			addressesObj.description = direccion;

			await AppDataSource.getRepository(AddressDB).save(addressesObj);

			const cellphoneObj = await AppDataSource.getRepository(CellPhoneDB).findOne({
				where: {
					cellPhoneid: parseInt(id),
				},
			});

			if (!cellphoneObj) throw new Error('Numero de celular no encontrado');

			cellphoneObj.cellNumber = celular;
			cellphoneObj.operators = operatorObj;

			await AppDataSource.getRepository(CellPhoneDB).save(cellphoneObj);

			const areaObj = await AppDataSource.getRepository(AreasMTSDB).findOne({
				where: {
					areaId: parseInt(id),
				},
			});

			if (!areaObj) throw new Error('Area(mts) no encontrada');

			areaObj.size = area;

			await AppDataSource.getRepository(AreasMTSDB).save(areaObj);

			const sectorObj = await AppDataSource.getRepository(SectorDB).findOne({
				where: {
					sectorId: parseInt(id),
				},
			});

			if (!sectorObj) throw new Error('Sector no encontrado');

			sectorObj.code = sector;

			await AppDataSource.getRepository(SectorDB).save(sectorObj);

			const standObj = await AppDataSource.getRepository(StandsDB).findOne({
				where: {
					standId: parseInt(id),
				},
			});

			if (!standObj) throw new Error('Puesto no encontrado');

			standObj.code = code;
			standObj.rubro = fieldObj;

			await AppDataSource.getRepository(StandsDB).save(standObj);

			const personObj = await AppDataSource.getRepository(PersonaDB).findOne({
				where: {
					personId: parseInt(id),
				},
			});

			if (!personObj) throw new Error('Persona no encontrada');

			personObj.name = name;
			personObj.lastname = lastname;
			personObj.date_birth = date_birth;
			personObj.gender = genderObj;

			await AppDataSource.getRepository(PersonaDB).save(personObj);

			const numDocumentObj = await AppDataSource.getRepository(NumdocumentDB).findOne({
				where: {
					asocciate: {
						associateId: parseInt(id),
					},
				},
			});
			if (!numDocumentObj) throw new Error('El numero de documento no existe');

			numDocumentObj.numDocument = numDocument;
			numDocumentObj.tipoDocumento = documentObj;

			await AppDataSource.getRepository(NumdocumentDB).save(numDocumentObj);

			const associateObj = await AppDataSource.getRepository(AssociatesDB).findOne({
				where: {
					associateId: parseInt(id),
				},
			});

			if (!associateObj) throw new Error('Asociado no existe');

			associateObj.folio = folio;

			const responseAssociates =
				await AppDataSource.getRepository(AssociatesDB).save(associateObj);
			return responseAssociates;
		} catch (e: any) {
			throw new Error(e.message);
		}
	};

	async DeleteAssociate(id: string) {
		try {
			const payments = await AppDataSource.getRepository(DetailPaymentDB).find({
				where: {
					person: {
						personId: parseInt(id)
					}	
				},
			});

			if (payments.length > 0) {
				throw new Error('Existen pagos relacionados con este asociado, no se puede eliminar'); // Puedes personalizar el mensaje según tus necesidades
			}

			const associateDelete = await AppDataSource.getRepository(AssociatesDB).findOne({
				where: {
					associateId: parseInt(id),
				},
				relations: {
					persons: {
						addresses: true,
						cellPhones: true,
						stands: true,
					},
				},
			});
			if (!associateDelete) throw new Error('Asociado no existe');

			associateDelete.persons.cellPhones.forEach(
				async (cellphone) =>
					await AppDataSource.getRepository(CellPhoneDB).delete(cellphone.cellPhoneid),
			);
			associateDelete.persons.addresses.forEach(
				async (address) =>
					await AppDataSource.getRepository(AddressDB).delete(address.addressId),
			);
			associateDelete.persons.stands.forEach(
				async (stand) => await AppDataSource.getRepository(StandsDB).delete(stand.standId),
			);

			const associate = await AppDataSource.getRepository(AssociatesDB).findOne({
				where: {
					associateId: parseInt(id),
				},
			});
			if (!associate) throw new Error('Asociado no encontrado');
			const responseDelete = await AppDataSource.getRepository(AssociatesDB).delete(associate);
			return responseDelete;
		} catch (e: any) {
			throw new Error(e.message);
		}
	}
}

export const associateService = AssociateService.getInstance();
