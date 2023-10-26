import { AppDataSource } from "../app.config";
import { Auth } from "../interfaces/auth.interface";
import { User } from "../interfaces/user.interface";
import { SexoDB } from "../models/sexo";
import { TipoDocumentoDB } from "../models/tipo_documento";
import { UserDB } from "../models/user";
import { encrypt, verified } from "../utils/bcrypt.handle";
import { generateToken } from "../utils/jwt.handle";

class AuthService{
    private static instance: AuthService;
    public static getInstance(): AuthService{
        if(!AuthService.instance){
            this.instance = new AuthService();
        }

        return this.instance;
    }
    registerNewUser = async ({dni, password, name, lastname, date_birth, gender, document}: User) =>{
        try{
            const checksIs = await AppDataSource.getRepository(UserDB).findOneBy({ dni });
            if(checksIs) throw new Error("ALREADY_REGISTERED");
            
            const genderObj = await AppDataSource.getRepository(SexoDB)
            .findOne({where: {genderId: gender}})
        
            if(!genderObj) throw new Error("GENDER_NOT_FOUND");
        
            const documentObj = await AppDataSource.getRepository(TipoDocumentoDB)
            .findOne({where: {tipoDocId: document}})
        
            if(!documentObj) throw new Error("DOCUMENT_NOT_FOUND");
            
            const newUser = new UserDB();
            newUser.name = name;
            newUser.lastname = lastname;
            newUser.date_birth = date_birth;
            newUser.gender = genderObj;
            newUser.tipoDocumento = documentObj;
        
            const passHash = await encrypt(password);
        
            newUser.dni = dni;
            newUser.password = passHash;
        
            const responseInsert = await AppDataSource.getRepository(UserDB).save(newUser);
            return responseInsert;

        }catch(e: any){
            throw new Error(e.message)
        }
        
    }
    
    loginUser = async ({dni, password}: Auth) =>{
        try{
            const user = await AppDataSource.getRepository(UserDB).findOneBy({ dni });
            if(!user) throw new Error("USER_NOT_FOUND");
        
            const passwordHash = user.password
            const isCorrect = await verified(password, passwordHash);
        
            if(!isCorrect) throw new Error("PASSWORD_INCORRECT");
        
            const token = generateToken(user.dni.toString())
        
            return token;
        }catch(e: any){
            throw new Error(e.message);
        }
    };
}


export const authService = AuthService.getInstance()