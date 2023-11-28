import { genderService } from "../services/genero.service";
import { Request, Response } from "express";
import { handleHttp } from "../utils/err.handle";

class GenderController{
	private static instance: GenderController;
	public static getInstance(): GenderController{
		if(!GenderController.instance){
			this.instance = new GenderController();
		}
		return this.instance;
	}

    async GetGender(req: Request ,res: Response){
		try{
			const response = await genderService.GetGender();
			return res.status(200).json(response);
        }catch(e: any){
            handleHttp(res, "Error al obtener los generos", e.message);
        }
    }
}

export const genderController = GenderController.getInstance();