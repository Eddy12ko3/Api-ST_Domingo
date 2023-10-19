import { AppDataSource } from "../app.config";
import { Auth } from "../interfaces/auth.interface";
import { User } from "../interfaces/user.interface";
import { PersonaDB } from "../models/persona";
import { SexoDB } from "../models/sexo";
import { TipoDocumentoDB } from "../models/tipo_documento";
import { UserDB } from "../models/user";
import { encrypt, verified } from "../utils/bcrypt.handle";
import { generateToken } from "../utils/jwt.handle";

const registerNewUser = async ({dni, password, name, lastname, date_birth, gender, document}: User) =>{
    const checksIs = await AppDataSource.getRepository(UserDB).findOneBy({ dni });
    if(checksIs) return "already registered";
    
    // const genderid = await AppDataSource.getRepository(SexoDB)
    // .createQueryBuilder('sexodb')
    // .select('sexodb.genderId')
    // .where('sexodb.description = :description', { description: gender })
    // .getOne();

    // if(genderid == null) return "gender no found";

    // const tipoDocId = await AppDataSource.getRepository(TipoDocumentoDB)
    // .createQueryBuilder('tipodoc')
    // .select('tipodoc.tipoDocId')
    // .where('tipodoc.description = :description', { description: document})
    // .getOne();

    // if(tipoDocId == null) return "tipoDoc no found";

    const genderObj = await AppDataSource.getRepository(SexoDB)
    .findOne({where: {genderId: gender}})

    if(!genderObj) return "gender not found"

    const documentObj = await AppDataSource.getRepository(TipoDocumentoDB)
    .findOne({where: {tipoDocId: document}})

    if(!documentObj) return "document not found"
    
    const newPerson = new PersonaDB();
    newPerson.name = name;
    newPerson.lastname = lastname;
    newPerson.date_birth = date_birth;
    newPerson.gender = genderObj;
    newPerson.tipoDocumento = documentObj;

    const passHash = await encrypt(password);

    const newUser = new UserDB();
    newUser.dni = dni;
    newUser.password = passHash;
    newUser.persons = [newPerson]

    const responseInsert = await AppDataSource.getRepository(UserDB).save(newUser);
    return responseInsert
}

const loginUser = async ({dni, password}: Auth) =>{
    const user = await AppDataSource.getRepository(UserDB).findOneBy({ dni });
    if(!user) return "not found user";

    const passwordHash = user.password
    const isCorrect = await verified(password, passwordHash);

    if(!isCorrect) return "password is incorrect"

    const token = generateToken(user.dni.toString())

    return token;
};

export {registerNewUser, loginUser}