import { Response, Request} from "express"
import { loginUser, registerNewUser } from "../services/auth"
import { handleHttp } from "../utils/err.handle"

const registerCtrl = async ({body}: Request, res: Response) =>{
    try{
        const {dni, password, name, lastname, date_birth, gender, document} = body
        const responseUser = await registerNewUser({dni, password, name, lastname, date_birth, gender, document})
        return res.status(200).json({ message: "registrado correctamente"})
    }catch(e: any){
        handleHttp(res, "ERR_REGISTER_USER", e.message)
    }
}

const loginCtrl = async ({body}: Request, res: Response) =>{
    try{
        const {dni, password} = body;
        const responseUser = await loginUser({dni, password})
        return res.status(200).json(responseUser)
    }catch(e: any) {
        handleHttp(res, "ERR_LOGIN_USER", e.message)
    }
}

export { registerCtrl, loginCtrl }