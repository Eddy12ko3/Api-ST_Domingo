import { Request, Response } from "express";
import { handleHttp } from "../utils/err.handle";
import { operatorService } from "../services/operador.service";

class OperatorController{
	private static instance: OperatorController
	public static getInstance(): OperatorController{
		if(!OperatorController.instance){
			this.instance = new OperatorController();
		}
        return this.instance;
    }

    async GetOperators(req: Request, res: Response){
        try{
            const response = await operatorService.GetOperator();
            return res.status(200).json(response);
        }catch(e: any){
            handleHttp(res, "Error al obtener los operadores", e.message);
        }
    }
}

export const operatorController = OperatorController.getInstance();