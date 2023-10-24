import { AppDataSource } from "../app.config";
import { Associate } from "../interfaces/asociados.interface";
import { AssociatesDB } from "../models/asociados";
import { PersonaDB } from "../models/persona";
import { SexoDB } from "../models/sexo";
import { TipoDocumentoDB } from "../models/tipo_documento";

const InsertAssociate = async ({folio, dni, name, lastname, date_birth, gender, document}: Associate) => {
    
    const genderObj = await AppDataSource.getRepository(SexoDB)
    .findOne({where: {genderId: gender}})

    if(!genderObj) throw new Error("GENDER_NOT_FOUND");

    const documentObj = await AppDataSource.getRepository(TipoDocumentoDB)
    .findOne({where: {tipoDocId: document}})

    if(!documentObj) throw new Error("DOCUMENT_NOT_FOUND");

    const newPerson = new PersonaDB();
    newPerson.name = name;
    newPerson.lastname = lastname;
    newPerson.date_birth = date_birth;
    newPerson.gender = genderObj;
    newPerson.tipoDocumento = documentObj;

    const newAssociate = new AssociatesDB();
    newAssociate.folio = folio;
    newAssociate.dni = dni;
    newAssociate.persons = [newPerson]

    const responseInsert = await AppDataSource.getRepository(AssociatesDB).save(newAssociate);
    return responseInsert

};

const GetAssociates = async () =>{
    const responseAssociates = await AppDataSource.getRepository(AssociatesDB)
        .createQueryBuilder("a")
        .innerJoin("a.persons", "p")
        .select(["a.folio", "p.name"])
        .getMany()

    return responseAssociates;
};

const UpdateAssociates = async (id: string, {folio, name, lastname, date_birth, gender, document}: Associate) =>{
    const genderObj = await AppDataSource.getRepository(SexoDB)
    .findOne({where: {genderId: gender}})

    if(!genderObj) throw new Error("GENDER_NOT_FOUND");

    const documentObj = await AppDataSource.getRepository(TipoDocumentoDB)
    .findOne({where: {tipoDocId: document}})

    if(!documentObj) throw new Error("DOCUMENT_NOT_FOUND");

    const newPerson = new PersonaDB();
    newPerson.name = name;
    newPerson.lastname = lastname;
    newPerson.date_birth = date_birth;
    newPerson.gender = genderObj;
    newPerson.tipoDocumento = documentObj;

    // const associateObj = await AppDataSource.getRepository(AssociatesDB).findOne({where: {associateId: id}})

    // if(!associateObj) throw new Error("REGISTER_NOT_OUND");
    const newAssociate = new AssociatesDB();
    newAssociate.associateId = parseInt(id);
    newAssociate.folio = folio;
    newAssociate.persons = [newPerson]

    const responseAssociates = await AppDataSource.getRepository(AssociatesDB).save(newAssociate);
    return responseAssociates
};


export {InsertAssociate, UpdateAssociates, GetAssociates}