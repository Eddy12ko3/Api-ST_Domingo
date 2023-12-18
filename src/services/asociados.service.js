"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.associateService = void 0;
const app_config_1 = require("../app.config");
const areas_1 = require("../models/areas");
const asociados_1 = require("../models/asociados");
const celular_1 = require("../models/celular");
const detalle_pago_1 = require("../models/detalle_pago");
const direccion_1 = require("../models/direccion");
const n_documento_1 = require("../models/n_documento");
const operador_1 = require("../models/operador");
const persona_1 = require("../models/persona");
const puestos_1 = require("../models/puestos");
const rubros_1 = require("../models/rubros");
const sector_1 = require("../models/sector");
const sexo_1 = require("../models/sexo");
const tipo_documento_1 = require("../models/tipo_documento");
class AssociateService {
    constructor() {
        this.InsertAssociate = ({ folio, numDocument, name, lastname, date_birth, gender, document, direccion, celular, operador, code, area, sector, rubro, }) => __awaiter(this, void 0, void 0, function* () {
            try {
                const checksIs = yield app_config_1.AppDataSource.getRepository(n_documento_1.NumdocumentDB).findOneBy({
                    numDocument,
                });
                if (checksIs)
                    throw new Error('Este asociado ya ha sido registrado');
                const genderObj = yield app_config_1.AppDataSource.getRepository(sexo_1.SexoDB).findOne({
                    where: {
                        genderId: gender,
                    },
                });
                if (!genderObj)
                    throw new Error('Genero no encontrado');
                const documentObj = yield app_config_1.AppDataSource.getRepository(tipo_documento_1.TipoDocumentoDB).findOne({
                    where: {
                        tipoDocId: document,
                    },
                });
                if (!documentObj)
                    throw new Error('Documento no encontrado');
                const operatorObj = yield app_config_1.AppDataSource.getRepository(operador_1.OperatorDB).findOne({
                    where: {
                        operatorId: operador,
                    },
                });
                if (!operatorObj)
                    throw new Error('Operador no encontrado');
                const fieldObj = yield app_config_1.AppDataSource.getRepository(rubros_1.FieldsDB).findOne({
                    where: {
                        fieldId: rubro
                    },
                });
                if (!fieldObj)
                    throw new Error('Rubro no encontrado');
                const newnumDocument = new n_documento_1.NumdocumentDB();
                newnumDocument.numDocument = numDocument;
                newnumDocument.tipoDocumento = documentObj;
                const newDireccion = new direccion_1.AddressDB();
                newDireccion.description = direccion;
                const newcelular = new celular_1.CellPhoneDB();
                newcelular.cellNumber = celular;
                newcelular.operators = operatorObj;
                const newArea = new areas_1.AreasMTSDB();
                newArea.size = area;
                const newSector = new sector_1.SectorDB();
                newSector.code = sector;
                const newStand = new puestos_1.StandsDB();
                newStand.code = code;
                newStand.areas = newArea;
                newStand.sector = newSector;
                newStand.rubro = fieldObj;
                const newPerson = new persona_1.PersonaDB();
                newPerson.name = name;
                newPerson.lastname = lastname;
                newPerson.date_birth = date_birth;
                newPerson.gender = genderObj;
                newPerson.stands = [newStand];
                newPerson.addresses = [newDireccion];
                newPerson.cellPhones = [newcelular];
                const newAssociate = new asociados_1.AssociatesDB();
                newAssociate.folio = folio;
                newAssociate.numDocument = newnumDocument;
                newAssociate.persons = newPerson;
                const responseInsert = yield app_config_1.AppDataSource.getRepository(asociados_1.AssociatesDB).save(newAssociate);
                return responseInsert;
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
        this.GetAssociates = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const responseAssociates = yield app_config_1.AppDataSource.getRepository(asociados_1.AssociatesDB).find({
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
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
        this.UpdateAssociates = (id, { folio, numDocument, name, lastname, date_birth, gender, document, direccion, celular, operador, code, area, sector, rubro, }) => __awaiter(this, void 0, void 0, function* () {
            try {
                const genderObj = yield app_config_1.AppDataSource.getRepository(sexo_1.SexoDB).findOne({
                    where: {
                        genderId: gender,
                    },
                });
                if (!genderObj)
                    throw new Error('Genero no encontrado');
                const documentObj = yield app_config_1.AppDataSource.getRepository(tipo_documento_1.TipoDocumentoDB).findOne({
                    where: {
                        tipoDocId: document,
                    },
                });
                if (!documentObj)
                    throw new Error('Documento no encontrado');
                const operatorObj = yield app_config_1.AppDataSource.getRepository(operador_1.OperatorDB).findOne({
                    where: {
                        operatorId: operador,
                    },
                });
                if (!operatorObj)
                    throw new Error('Operador no encontrado');
                const fieldObj = yield app_config_1.AppDataSource.getRepository(rubros_1.FieldsDB).findOne({
                    where: {
                        fieldId: rubro
                    },
                });
                if (!fieldObj)
                    throw new Error('Rubro no encontrado');
                const addressesObj = yield app_config_1.AppDataSource.getRepository(direccion_1.AddressDB).findOne({
                    where: {
                        addressId: parseInt(id),
                    },
                });
                if (!addressesObj)
                    throw new Error('Direccion no encontrada');
                addressesObj.description = direccion;
                yield app_config_1.AppDataSource.getRepository(direccion_1.AddressDB).save(addressesObj);
                const cellphoneObj = yield app_config_1.AppDataSource.getRepository(celular_1.CellPhoneDB).findOne({
                    where: {
                        cellPhoneid: parseInt(id),
                    },
                });
                if (!cellphoneObj)
                    throw new Error('Numero de celular no encontrado');
                cellphoneObj.cellNumber = celular;
                cellphoneObj.operators = operatorObj;
                yield app_config_1.AppDataSource.getRepository(celular_1.CellPhoneDB).save(cellphoneObj);
                const areaObj = yield app_config_1.AppDataSource.getRepository(areas_1.AreasMTSDB).findOne({
                    where: {
                        areaId: parseInt(id),
                    },
                });
                if (!areaObj)
                    throw new Error('Area(mts) no encontrada');
                areaObj.size = area;
                yield app_config_1.AppDataSource.getRepository(areas_1.AreasMTSDB).save(areaObj);
                const sectorObj = yield app_config_1.AppDataSource.getRepository(sector_1.SectorDB).findOne({
                    where: {
                        sectorId: parseInt(id),
                    },
                });
                if (!sectorObj)
                    throw new Error('Sector no encontrado');
                sectorObj.code = sector;
                yield app_config_1.AppDataSource.getRepository(sector_1.SectorDB).save(sectorObj);
                const standObj = yield app_config_1.AppDataSource.getRepository(puestos_1.StandsDB).findOne({
                    where: {
                        standId: parseInt(id),
                    },
                });
                if (!standObj)
                    throw new Error('Puesto no encontrado');
                standObj.code = code;
                standObj.rubro = fieldObj;
                yield app_config_1.AppDataSource.getRepository(puestos_1.StandsDB).save(standObj);
                const personObj = yield app_config_1.AppDataSource.getRepository(persona_1.PersonaDB).findOne({
                    where: {
                        personId: parseInt(id),
                    },
                });
                if (!personObj)
                    throw new Error('Persona no encontrada');
                personObj.name = name;
                personObj.lastname = lastname;
                personObj.date_birth = date_birth;
                personObj.gender = genderObj;
                yield app_config_1.AppDataSource.getRepository(persona_1.PersonaDB).save(personObj);
                const numDocumentObj = yield app_config_1.AppDataSource.getRepository(n_documento_1.NumdocumentDB).findOne({
                    where: {
                        asocciate: {
                            associateId: parseInt(id),
                        },
                    },
                });
                if (!numDocumentObj)
                    throw new Error('El numero de documento no existe');
                numDocumentObj.numDocument = numDocument;
                numDocumentObj.tipoDocumento = documentObj;
                yield app_config_1.AppDataSource.getRepository(n_documento_1.NumdocumentDB).save(numDocumentObj);
                const associateObj = yield app_config_1.AppDataSource.getRepository(asociados_1.AssociatesDB).findOne({
                    where: {
                        associateId: parseInt(id),
                    },
                });
                if (!associateObj)
                    throw new Error('Asociado no existe');
                associateObj.folio = folio;
                const responseAssociates = yield app_config_1.AppDataSource.getRepository(asociados_1.AssociatesDB).save(associateObj);
                return responseAssociates;
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    static getInstance() {
        if (!AssociateService.instance) {
            this.instance = new AssociateService();
        }
        return this.instance;
    }
    DeleteAssociate(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payments = yield app_config_1.AppDataSource.getRepository(detalle_pago_1.DetailPaymentDB).find({
                    where: {
                        person: {
                            personId: parseInt(id)
                        }
                    },
                });
                if (payments.length > 0) {
                    throw new Error('Existen pagos relacionados con este asociado, no se puede eliminar'); // Puedes personalizar el mensaje según tus necesidades
                }
                const associateDelete = yield app_config_1.AppDataSource.getRepository(asociados_1.AssociatesDB).findOne({
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
                if (!associateDelete)
                    throw new Error('Asociado no existe');
                associateDelete.persons.cellPhones.forEach((cellphone) => __awaiter(this, void 0, void 0, function* () { return yield app_config_1.AppDataSource.getRepository(celular_1.CellPhoneDB).delete(cellphone.cellPhoneid); }));
                associateDelete.persons.addresses.forEach((address) => __awaiter(this, void 0, void 0, function* () { return yield app_config_1.AppDataSource.getRepository(direccion_1.AddressDB).delete(address.addressId); }));
                associateDelete.persons.stands.forEach((stand) => __awaiter(this, void 0, void 0, function* () { return yield app_config_1.AppDataSource.getRepository(puestos_1.StandsDB).delete(stand.standId); }));
                const associate = yield app_config_1.AppDataSource.getRepository(asociados_1.AssociatesDB).findOne({
                    where: {
                        associateId: parseInt(id),
                    },
                });
                if (!associate)
                    throw new Error('Asociado no encontrado');
                const responseDelete = yield app_config_1.AppDataSource.getRepository(asociados_1.AssociatesDB).delete(associate);
                return responseDelete;
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
}
exports.associateService = AssociateService.getInstance();
