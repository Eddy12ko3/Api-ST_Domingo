import { Request, Response } from "express"
import { handleHttp } from "../utils/err.handle"
import { InsertProduct, GetProducts, GetProduct, UpdateProduct, DeleteProduct } from "../services/producto";

const getProduct = async (req: Request, res: Response) =>{
    try{
        const {id} = req.params;
        const response = await GetProduct(id);
        if(response){
            return res.status(200).json(response);
        }else{
            return res.json({message:"registro no encontrado"});
        }
        
    }catch(e){
        handleHttp(res, "ERR_GET_PRODUCT", e);
    }
}

const getProducts = async (req: Request, res: Response) =>{
    try{
        const response = await GetProducts();
        if(response){
            return res.status(200).json(response);
        }else{
            return res.json({message:"No hay registros"});
        }
    
    }catch(e){
        handleHttp(res, "ERR_GET_PRODUCTS", e);
    }
}

const updateProduct = async (req: Request, res: Response) =>{
    try{
        const {id} = req.params; 
        const response = await UpdateProduct(id, req.body);
        if(response){
            res.status(200).json({success: "modificado correctamente"})
        }else{
            res.status(500).json({error: "error updating product"})
        }
    }catch(e){
        handleHttp(res, "ERR_UPDATE_PRODUCT", e);
    }
}

const postProduct = async ({body}: Request, res: Response) =>{
    try{
        const response = await InsertProduct(body)
        console.log(response)
        return res.status(200).json({message: "insertado correctamente"})
    }catch(e){
        handleHttp(res, "ERR_POST_PRODUCT", e)
    }
}

const deleteProduct = async (req: Request, res: Response) =>{
    try{
        const {id} = req.params; 
        const response = await DeleteProduct(id);
        if(response.affected && response.affected >0){
            res.status(200).json({message: "Product deleted successfully"});
        }else{
            res.status(404).json({message: "Product not found"});
        }
    }catch(e){
        handleHttp(res, "ERR_DELETE_PRODUCT", e)
    }
}

export{getProduct, getProducts, updateProduct, postProduct, deleteProduct}