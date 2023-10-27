import { Response, Request} from "express"
import { authService } from "../services/auth.service"
import { handleHttp } from "../utils/err.handle"

class AuthController{
    private static instance: AuthController; 
    public static getInstance(): AuthController{
        if(!AuthController.instance){
            this.instance = new AuthController(); 
        }
        return this.instance;
    }
    registerCtrl = async ({body}: Request, res: Response) =>{
        try{
            const {
                dni, 
                password, 
                name, 
                lastname, 
                date_birth, 
                gender, 
                document
            } = body;
            const responseUser = await authService.registerNewUser({
                dni: dni, 
                password: password, 
                name: name, 
                lastname: lastname, 
                date_birth: date_birth, 
                gender: gender, 
                document: document
            });

            return res.status(200).json({ message: "registrado correctamente"});
        }catch(e: any){
            handleHttp(res, "ERR_REGISTER_USER", e.message)
        }
    }
    
    loginCtrl = async ({body}: Request, res: Response) =>{
        try{
            const {
                dni, 
                password
            } = body;
            const responseUser = await authService.loginUser({
                dni: dni, 
                password: password
            })
            return res.status(200).json(responseUser)
        }catch(e: any) {
            handleHttp(res, "ERR_LOGIN_USER", e.message)
        }
    }
    
}

export const authController = AuthController.getInstance();

