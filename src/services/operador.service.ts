import { AppDataSource } from "../app.config";
import { OperatorDB } from "../models/operador";

export const insertOperator = async (operator: string) => {
    const operepo = AppDataSource.getRepository(OperatorDB);
    const exist = await operepo.exist({
        where: {
            name: operator
        }
    });
    if (!exist) {
        const operador = new OperatorDB();
        operador.name = operator;
        await operepo.save(operador);
    }
}