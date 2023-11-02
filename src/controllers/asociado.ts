import { Request, Response } from "express"
import { associateService } from "../services/asociados.service";
import { handleHttp } from "../utils/err.handle";

class AssociateController{
    private static instance: AssociateController; 
    public static getInstance(): AssociateController{
        if(!AssociateController.instance){
            this.instance = new AssociateController();
        }
        return this.instance
    }

    postAssociates = async (req: Request, res: Response) =>{
        try{
            const {
                folio, 
                numDocument, 
                name, 
                lastname, 
                date_birth, 
                gender, 
                document,
                direccion,
                celular,
                operador,
                code,  
                area,
                sector,
                rubro
            } = req.body
            const response = await associateService.InsertAssociate({
                folio: folio, 
                numDocument: numDocument, 
                name: name, 
                lastname: lastname, 
                date_birth: date_birth, 
                gender: gender, 
                document: document,
                direccion: direccion,
                celular: celular,
                operador: operador,
                code: code,
                area: area,
                sector: sector,
                rubro: rubro
            });
            return res.status(200).json({message: "Agregado Correctamente"})
        }catch(e: any){
            handleHttp(res, "ERR_POST_ASSOCIATES", e.message)
        }
    }

    getAssociate = async (req: Request, res: Response) =>{
        try{
            
        }catch(e){
            handleHttp(res, "ERR_GET_ASSOCIATE", e);
        }
    }
    
    getAssociates = async (req: Request, res: Response) =>{
        try{
            const response = await associateService.GetAssociates();
            if(response.length > 0){
                return res.status(200).json(response);
            }else{
                return res.json({message:"No hay registros"});
            }
        
        }catch(e: any){
            handleHttp(res, "ERR_GET_ASSOCIATES", e.message);
        }
    }
    
    updateAssociates = async (req: Request, res: Response) =>{
        try{
            const {id} = req.params; 
            const {
                folio, 
                numDocument, 
                name, 
                lastname, 
                date_birth, 
                gender, 
                document,
                direccion,
                celular,
                operador,
                code,
                area,
                sector,
                rubro
            } = req.body
            const response = await associateService.UpdateAssociates(id, {
                folio: folio, 
                numDocument: numDocument, 
                name: name, 
                lastname: lastname, 
                date_birth: date_birth, 
                gender: gender, 
                document: document,
                direccion: direccion,
                celular: celular,
                operador: operador,
                code: code,
                area: area,
                sector: sector,
                rubro: rubro
            });
            if(response){
                console.log(response)
                res.status(200).json({
                    success: "modificado correctamente"
                })
            }else{
                res.status(500).json({
                    error: "error updating associate"
                })
            }
        }catch(e: any){
            handleHttp(res, "ERR_UPDATE_ASSOCIATES", e.message);
            
        }
    }
    
    deleteAssociates = async (req: Request, res: Response) =>{
        try{
            const {id} = req.params; 
            const response = await associateService.DeleteAssociate(id);
            if(response){
                res.status(200).json({
                    message: "Asociado borrado correctamente"
                });
            }else{
                res.status(404).json({
                    message: "Asociado not found"
                });
            }
        }catch(e: any){
            handleHttp(res, "ERR_DELETE_ASSOCIATE", e.message)
        }
    }
}

export const associateController = AssociateController.getInstance();
