import { AppDataSource } from "../app.config";
import { Associate } from "../interfaces/asociados.interface";
import { AreasMTSDB } from "../models/areas";
import { AssociatesDB } from "../models/asociados";
import { CellPhoneDB } from "../models/celular";
import { AddressDB } from "../models/direccion";
import { NumdocumentDB } from "../models/n_documento";
import { OperatorDB } from "../models/operador";
import { PersonaDB } from "../models/persona";
import { StandsDB } from "../models/puestos";
import { FieldsDB } from "../models/rubros";
import { SectorDB } from "../models/sector";
import { SexoDB } from "../models/sexo";
import { TipoDocumentoDB } from "../models/tipo_documento";

class AssociateService{
    private static instance: AssociateService;
    public static getInstance(): AssociateService{
        if(!AssociateService.instance){
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
        rubro
    }: Associate) => {
        try{
            const checksIs = await AppDataSource.getRepository(NumdocumentDB).findOneBy({ numDocument });
            if(checksIs) throw new Error("ALREADY_REGISTERED");
            
            const genderObj = await AppDataSource.getRepository(SexoDB)
            .findOne({
                where: {
                    genderId: gender
                }
            });
            if(!genderObj) throw new Error("GENDER_NOT_FOUND");
        
            const documentObj = await AppDataSource.getRepository(TipoDocumentoDB)
            .findOne({
                where: {
                    tipoDocId: document
                }
            });
            if(!documentObj) throw new Error("DOCUMENT_NOT_FOUND");

            const operatorObj = await AppDataSource.getRepository(OperatorDB)
            .findOne({
                where: {
                    operatorId: operador
                }
            });
            if(!operatorObj) throw new Error("OPERATOR_NOT_FOUND");
            
            
            const newnumDocument = new NumdocumentDB();
            newnumDocument.numDocument = numDocument;
            newnumDocument.tipoDocumento = documentObj;

            const newDireccion = new AddressDB()
            newDireccion.description = direccion;
            
            const newcelular = new CellPhoneDB();
            newcelular.cellNumber = celular;
            newcelular.operators = operatorObj;

            const newPerson = new PersonaDB();
            newPerson.name = name;
            newPerson.lastname = lastname;
            newPerson.date_birth = date_birth;
            newPerson.gender = genderObj;

            newPerson.addresses = [newDireccion]
            newPerson.cellPhones = [newcelular];
            
            const newArea = new AreasMTSDB()
            newArea.size = area;

            const newSector = new SectorDB();
            newSector.code = sector;

            const newField = new FieldsDB();
            newField.nameField = rubro;

            const newStand = new StandsDB();
            newStand.code = code;
            newStand.persons = [newPerson];
            newStand.areas = newArea
            newStand.sector = newSector
            newStand.rubro = newField

            await AppDataSource.getRepository(NumdocumentDB).save(newnumDocument);     
            await AppDataSource.getRepository(StandsDB).save(newStand);

            const newAssociate = new AssociatesDB();
            newAssociate.folio = folio;
            newAssociate.numDocument = newnumDocument;
            newAssociate.persons = newPerson;
            
            const responseInsert = await AppDataSource.getRepository(AssociatesDB).save(newAssociate)
            
            return responseInsert 

        }catch(e: any){
            throw new Error(e.message)
        }
        
    };
    
    GetAssociates = async () =>{
        try{
            const responseAssociates = await AppDataSource.getRepository(AssociatesDB)
            .find({
                relations: {
                    persons: {
                        addresses: true,
                        cellPhones: {
                            operators: true
                        },
                        stands: {
                            areas: true,
                            sector: true,
                            
                        }
                        
                    }
                }
                
            })
    
            return responseAssociates;
        }catch(e: any){
            throw new Error(e.message)
        }
    };
    
    UpdateAssociates = async (id: string, {
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
        rubro
    }: Associate) =>{
        try{
            const genderObj = await AppDataSource.getRepository(SexoDB)
                .findOne({
                    where: {
                        genderId: gender
                    }
                })
    
            if(!genderObj) throw new Error("GENDER_NOT_FOUND");
        
            const documentObj = await AppDataSource.getRepository(TipoDocumentoDB)
                .findOne({
                    where: {
                        tipoDocId: document
                    }
                })
        
            if(!documentObj) throw new Error("DOCUMENT_NOT_FOUND");
            
            const personObj = await AppDataSource.getRepository(PersonaDB)
                .findOne({
                    where: {
                        personId: parseInt(id)
                    }
                })
                
            if(!personObj) throw new Error("PERSON_NOT_FOUND");

            personObj.name = name;
            personObj.lastname = lastname;
            personObj.date_birth = date_birth;
            personObj.gender = genderObj;
            
            await AppDataSource.getRepository(PersonaDB).save(personObj)

            const numDocumentObj =await AppDataSource.getRepository(NumdocumentDB)
                .findOne({
                    where: {
                        numDocId: parseInt(id)
                    }
                })
            if(!numDocumentObj) throw new Error("NUM_DOCUMENT_NOT_FOUND");

            numDocumentObj.numDocument = numDocument
            numDocumentObj.tipoDocumento = documentObj

            await AppDataSource.getRepository(NumdocumentDB).save(numDocumentObj);

            const associateObj = await AppDataSource.getRepository(AssociatesDB)
                .findOne({
                    where: {
                        associateId: parseInt(id)
                    }
                })
            
            if(!associateObj) throw new Error("ASSOCIATE_NOT_FOUND");

            associateObj.folio = folio;
            
            const responseAssociates = await AppDataSource.getRepository(AssociatesDB).save(associateObj);
            return responseAssociates
        }catch(e: any){
            throw new Error(e.message)
        }
        
    };
    
    async DeleteAssociate(id: string){
        try{
            const associateDelete = await AppDataSource.getRepository(AssociatesDB)
            .findOne({where: {associateId: parseInt(id)}})

            if(!associateDelete) throw new Error("ASSOCIATE_NOT_FOUND")

            const responseDelete = await AppDataSource.getRepository(AssociatesDB).remove(associateDelete);

            return responseDelete;
        }catch(e: any){
            throw new Error(e.message)
        }
    }
}

export const associateService = AssociateService.getInstance();