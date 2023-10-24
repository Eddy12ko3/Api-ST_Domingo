import { Request, Response } from "express"
import { GetAssociates, InsertAssociate, UpdateAssociates } from "../services/asociados";
import { handleHttp } from "../utils/err.handle";

const getAssociate = async (req: Request, res: Response) =>{
    try{
        
    }catch(e){
        handleHttp(res, "ERR_GET_PRODUCT", e);
    }
}

const getAssociates = async (req: Request, res: Response) =>{
    try{
        const response = await GetAssociates();
        console.log(response)
        if(response){
            return res.status(200).json(response);
        }else{
            return res.json({message:"No hay registros"});
        }
    
    }catch(e: any){
        handleHttp(res, "ERR_GET_ASSOCIATES", e.message);
    }
}

const updateAssociates = async (req: Request, res: Response) =>{
    try{
        const {id} = req.params; 
        const response = await UpdateAssociates(id, req.body);
        if(response){
            res.status(200).json({success: "modificado correctamente"})
        }else{
            res.status(500).json({error: "error updating product"})
        }
    }catch(e: any){
        handleHttp(res, "ERR_UPDATE_ASSOCIATES", e.message);
        
    }
}

const postAssociates = async (request: Request, res: Response) =>{
    try{
        const {folio, dni, name, lastname, date_birth, gender, document} = request.body
        const response = await InsertAssociate({folio: folio, dni: dni, name: name, lastname: lastname, date_birth: date_birth, gender: gender, document: document})
        
        return res.status(200).json(response)
    }catch(e: any){
        console.log(e.message);
        handleHttp(res, "ERR_POST_ASSOCIATES", e.message)
    }
}

const deleteAssociates = async (req: Request, res: Response) =>{
    try{
        
    }catch(e){
        handleHttp(res, "ERR_DELETE_PRODUCT", e)
    }
}

export {getAssociates, getAssociate, deleteAssociates, postAssociates, updateAssociates}