import { Response, Request} from "express"
import { loginUser, registerNewUser } from "../services/auth"
import { handleHttp } from "../utils/err.handle"

const registerCtrl = async ({body}: Request, res: Response) =>{
    try{
        const responseUser = await registerNewUser(body)
        return res.status(200).json(responseUser)
    }catch(e){
        handleHttp(res, "ERR_REGISTER_USER", e)
    }
}

const loginCtrl = async ({body}: Request, res: Response) =>{
    try{
        const {dni, password} = body;
        const responseUser = await loginUser({dni, password})
        return res.status(200).json(responseUser)
    }catch(e){
        handleHttp(res, "ERR_LOGIN_USER", e)
    }
}

export { registerCtrl, loginCtrl }