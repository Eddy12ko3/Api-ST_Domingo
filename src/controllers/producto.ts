import { Request, Response } from "express"
import { handleHttp } from "../utils/err.handle"
import { InsertProduct } from "../services/producto";

const getProduct = (req: Request, res: Response) =>{
    try{

    }catch(e){
        handleHttp(res, "ERR_GET_PRODUCT");
    }
}

const getProducts = (req: Request, res: Response) =>{
    try{

    }catch(e){
        handleHttp(res, "ERR_GET_PRODUCTS");
    }
}

const updateProduct = (req: Request, res: Response) =>{
    try{

    }catch(e){
        handleHttp(res, "ERR_UPDATE_PRODUCT");
    }
}

const postProduct = async ({body}: Request, res: Response) =>{
    try{
        const responseInsert = await InsertProduct(body)
        console.log(responseInsert)
        return res.status(200).json(responseInsert)
    }catch(e){
        handleHttp(res, "ERR_POST_PRODUCT")
    }
}

const deleteProduct = (req: Request, res: Response) =>{
    try{

    }catch(e){
        handleHttp(res, "ERR_DELETE_PRODUCT")
    }
}

export{getProduct, getProducts, updateProduct, postProduct, deleteProduct}