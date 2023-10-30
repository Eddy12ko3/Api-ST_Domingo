import { AppDataSource } from "../app.config";
import { SexoDB } from "../models/sexo";

export const insertGenero = async (sexo: string) => {
    const sexorepo = AppDataSource.getRepository(SexoDB);
    const exist = await sexorepo.exist({
        where: {
            description: sexo
        }
    });
    if (!exist) {
        const genero = new SexoDB();
        genero.description = sexo;
        await sexorepo.save(genero);
    }
}