import { AppDataSource } from '../app.config';
import { Gender } from '../interfaces/genero.interface';
import { SexoDB } from '../models/sexo';

class GenderService{
	private static instance: GenderService;
	public static getInstance(): GenderService{
		if(!GenderService.instance){
			this.instance = new GenderService();
		}
		return this.instance;
	}

	async InsertGenero(genders: Array<Gender>){
		try{
			const sexorepo = AppDataSource.getRepository(SexoDB);
	
			for(const gender of genders){
				const exist = await sexorepo.exist({
					where: {
						description: gender.description,
					},
				});
				if (!exist) {
					const genero = new SexoDB();
					genero.description = gender.description;
					await sexorepo.save(genero);
				}
			}
        }catch(e: any){
            throw new Error(e.message);
        }
	};

	async GetGender(){
		try{
			const response = await AppDataSource.getRepository(SexoDB).find()
			return response;
        }catch(e: any){
            throw new Error(e.message);
        }
	}

}

export const genderService = GenderService.getInstance();
