import { AppDataSource } from "../app.config";
import { Fields } from "../interfaces/rubro.interface";
import { FieldsDB } from "../models/rubros";

class FieldsService{
    private static instance: FieldsService;
    public static getInstance(): FieldsService{
        if(!FieldsService.instance){
            this.instance = new FieldsService();
        }
        return this.instance;
    }

    async InsertField(fields: Array<Fields>){
		try{
			const fieldrepo = AppDataSource.getRepository(FieldsDB);
            if (!fieldrepo) {
                throw new Error('Repository is not available.');
            }
			for(const field of fields){
				const exist = await fieldrepo.exist({
					where: {
						nameField: field.nameField
					},
				});

				if (!exist) {
					const newField = new FieldsDB();
					newField.nameField = field.nameField;
					await fieldrepo.save(newField);
				}
			}
        }catch(e: any){
            throw new Error(e.message);
        }
	};

    async GetField(){
        try{
            const response = await AppDataSource.getRepository(FieldsDB).find();
            return response
        }catch(e: any){
            throw new Error(e.message);
        }
    }
}

export const fieldsService = FieldsService.getInstance();