import { AppDataSource } from "../app.config"
import { TipoDocumentoDB } from "../models/tipo_documento"

export const insertTipoDoc= async (tipoDoc: string) =>{
    const docrepo = AppDataSource.getRepository(TipoDocumentoDB)
    const exist = await docrepo.exist({
        where: {description: tipoDoc}
    });

    if(!exist){
        const document = new TipoDocumentoDB();
        document.description = tipoDoc;
        await docrepo.save(document);
    }
}   