import { Request, Response } from 'express';
import { tipoDocumentoService } from '../services/tipo_document.service';
import { handleHttp } from '../utils/err.handle';

class TipoDocumentoController{
	private static instance: TipoDocumentoController
	public static getInstance(): TipoDocumentoController{
		if(!TipoDocumentoController.instance){
			this.instance = new TipoDocumentoController();
		}
		return this.instance;
	}

    async GetTipoDocumento(req: Request, res: Response){
        try{
            const response = await tipoDocumentoService.GetTipoDoc();
            return res.status(200).json(response);
        }catch(e: any){
            handleHttp(res, "Error al obtener los datos", e.message);
        }
    }
}

export const tipoDocumentoController = TipoDocumentoController.getInstance();