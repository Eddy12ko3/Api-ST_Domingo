import { Request, Response } from "express"
import { handleHttp } from "../utils/err.handle"
import { JwtPayload } from "jsonwebtoken";

interface RequestExt extends Request{
    user?: string | JwtPayload;
}

const getItems = async (req: RequestExt, res: Response) =>{
    try{
       res.send({
        data: "esto es observable para usuarios con sesion jwt",
        user: req.user
    })
    }catch(e){
        handleHttp(res, "ERR_GET_PRODUCTS", e);
    }
}

export{getItems}