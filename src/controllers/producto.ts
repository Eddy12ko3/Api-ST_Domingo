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
        
    }catch(e: any){
        handleHttp(res, "ERR_GET_PRODUCT", e.message);
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
    
    }catch(e: any){
        handleHttp(res, "ERR_GET_PRODUCTS", e.message);
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
    }catch(e: any){
        handleHttp(res, "ERR_UPDATE_PRODUCT", e.message);
    }
}

const postProduct = async (request: Request, res: Response) =>{
    try{
        const {nombre, precio, cantidad, estado} = request.body
        const response = await InsertProduct({name: nombre, price: precio, quantity: cantidad, state: estado})
        return res.status(200).json({message: "producto insertado correctamente"})
    }catch(e: any){
        handleHttp(res, "ERR_POST_PRODUCT", e.message)
    }
}

const deleteProduct = async (req: Request, res: Response) =>{
    try{
        const {id} = req.params; 
        const response = await DeleteProduct(id);
        if(response.affected && response.affected >0){
            res.status(200).json({message: "Producto borrado correctamente"});
        }else{
            res.status(404).json({message: "Product not found"});
        }
    }catch(e: any){
        handleHttp(res, "ERR_DELETE_PRODUCT", e.message);
    }
}

export{getProduct, getProducts, updateProduct, postProduct, deleteProduct}