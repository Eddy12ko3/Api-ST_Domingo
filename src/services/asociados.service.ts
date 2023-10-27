import { AppDataSource } from "../app.config";
import { Associate } from "../interfaces/asociados.interface";
import { AssociatesDB } from "../models/asociados";
import { CellPhoneDB } from "../models/celular";
import { AddressDB } from "../models/direccion";
import { PersonaDB } from "../models/persona";
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
        dni, 
        name, 
        lastname, 
        date_birth, 
        gender, 
        document,
        direccion,
        celular, 
        operador,
    }: Associate) => {
        try{
            const genderObj = await AppDataSource.getRepository(SexoDB)
            .findOne({where: {genderId: gender}})
        
            if(!genderObj) throw new Error("GENDER_NOT_FOUND");
        
            const documentObj = await AppDataSource.getRepository(TipoDocumentoDB)
            .findOne({where: {tipoDocId: document}})
        
            if(!documentObj) throw new Error("DOCUMENT_NOT_FOUND");
            
            const newDireccion = new AddressDB()
            newDireccion.description = direccion
            
            const newcelular = new CellPhoneDB();
            newcelular.cellNumber = celular;
            newcelular.operator = operador;

            const newPerson = new PersonaDB();
            newPerson.name = name;
            newPerson.lastname = lastname;
            newPerson.date_birth = date_birth;
            newPerson.gender = genderObj;
            newPerson.tipoDocumento = documentObj;

            newPerson.addresses = [newDireccion]
            newPerson.cellPhones = [newcelular];

            const newAssociate = new AssociatesDB();
            newAssociate.folio = folio;
            newAssociate.dni = dni;
            newAssociate.persons = newPerson;
            
            const responseInsert = await AppDataSource.getRepository(AssociatesDB).save(newAssociate);
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
                    persons: true
                    
                }
            })
    
            return responseAssociates;
        }catch(e: any){
            throw new Error(e.message)
        }
    };
    
    UpdateAssociates = async (id: string, {folio, dni, name, lastname, date_birth, gender, document}: Associate) =>{
        try{
            const genderObj = await AppDataSource.getRepository(SexoDB)
            .findOne({where: {genderId: gender}})
    
            if(!genderObj) throw new Error("GENDER_NOT_FOUND");
        
            const documentObj = await AppDataSource.getRepository(TipoDocumentoDB)
                .findOne({where: {tipoDocId: document}})
        
            if(!documentObj) throw new Error("DOCUMENT_NOT_FOUND");
            
            const personObj = await AppDataSource.getRepository(PersonaDB)
                .findOne({where: {personId: parseInt(id)}})
                
            if(!personObj) throw new Error("PERSON_NOT_FOUND");

            personObj.name = name;
            personObj.lastname = lastname;
            personObj.date_birth = date_birth;
            personObj.gender = genderObj;
            personObj.tipoDocumento = documentObj;
        
            const associateObj = await AppDataSource.getRepository(AssociatesDB)
                .findOne({where: {associateId: parseInt(id)}})
            
            if(!associateObj) throw new Error("ASSOCIATE_NOT_FOUND");

            associateObj.dni = dni;
            associateObj.folio = folio;
            associateObj.persons = personObj;
        
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