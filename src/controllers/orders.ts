import { Request, Response } from "express"
import { handleHttp } from "../utils/err.handle"

const getItems = async (req: Request, res: Response) =>{
    try{
        if(req.body.usertoken)
        res.send({data: "esto es observable para usuarios con sesion jwt"})
    }catch(e){
        handleHttp(res, "ERR_GET_PRODUCTS", e);
    }
}

export{getItems}