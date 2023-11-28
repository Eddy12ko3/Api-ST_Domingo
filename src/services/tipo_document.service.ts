import { AppDataSource } from '../app.config';
import { TipoDocumento } from '../interfaces/tipo_document.interface';
import { TipoDocumentoDB } from '../models/tipo_documento';

class TipoDocumentoService{
	private static instance: TipoDocumentoService
	public static getInstance(): TipoDocumentoService{
		if(!TipoDocumentoService.instance){
			this.instance = new TipoDocumentoService();
		}
		return this.instance;
	}

	async InsertTipoDoc(tipoDocs: Array<TipoDocumento>){
		try{
			const docrepo = AppDataSource.getRepository(TipoDocumentoDB);
	
			for(const tipoDoc of tipoDocs){
				const exist = await docrepo.exist({
					where: { 
						description: tipoDoc.description
					},
				});
	
				if (!exist) {
					const document = new TipoDocumentoDB();
					document.description = tipoDoc.description;
					await docrepo.save(document);
				}
			}		
		}catch(e: any){
			throw new Error(e.message);
		}
	}

	async GetTipoDoc(){
		try{
			const response = await AppDataSource.getRepository(TipoDocumentoDB).find();
			return response
		}catch(e: any){
			throw new Error(e.message);
		}
	}
};

export const tipoDocumentoService = TipoDocumentoService.getInstance();