import { Request, Response } from "express";
import { handleHttp } from "../utils/err.handle";
import { fieldsService } from "../services/rubros.service";

class FieldsController{
	private static instance: FieldsController
	public static getInstance(): FieldsController{
		if(!FieldsController.instance){
			this.instance = new FieldsController();
		}
		return this.instance;
	}

    async GetField(req: Request, res: Response){
        try{
            const response = await fieldsService.GetField();
            return res.status(200).json(response);
        }catch(e: any){
            handleHttp(res, "Error al obtener los rubros", e.message);
        }
    } 

}

export const fieldsController = FieldsController.getInstance();