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
                numDocument, 
                password, 
                name, 
                lastname, 
                date_birth, 
                document
            } = body;
            const responseUser = await authService.registerNewUser({
                numDocument: numDocument, 
                password: password, 
                name: name, 
                lastname: lastname, 
                date_birth: date_birth, 
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
                numDocument, 
                password
            } = body;
            const responseUser = await authService.loginUser({
                numDocument: numDocument, 
                password: password
            })
            return res.status(200).json(responseUser)
        }catch(e: any) {
            handleHttp(res, "ERR_LOGIN_USER", e.message)
        }
    }
    
}

export const authController = AuthController.getInstance();

