import { AppDataSource } from '../app.config';
import { Operator } from '../interfaces/operator.interface';
import { OperatorDB } from '../models/operador';

class OperatorService{
	private static instance: OperatorService
	public static getInstance(): OperatorService{
		if(!OperatorService.instance){
			this.instance = new OperatorService();
		}
		return this.instance;
	}

	async InsertOperators(operators: Array<Operator>) {
		try{
			const operepo = AppDataSource.getRepository(OperatorDB);
	
			for (const operator of operators) {
				const exist = await operepo.exist({
					where: {
						name: operator.nameOperator,
					},
				});
	
				if (!exist) {
					const newOperator = new OperatorDB();
					newOperator.name = operator.nameOperator;
					await operepo.save(newOperator);
				}
			}
		}catch(e: any){
			throw new Error(e.message);
		}
	}

	async GetOperator(){
		try{
			const response = await AppDataSource.getRepository(OperatorDB).find();
			return response
		}catch(e: any){
			throw new Error(e.message);
		}
	}

}

export const operatorService = OperatorService.getInstance();


