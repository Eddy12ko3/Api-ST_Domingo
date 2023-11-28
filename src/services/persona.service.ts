import { AppDataSource } from '../app.config';
import { PersonaDB } from '../models/persona';

class PersonService {
	private static instance: PersonService;
	public static getInstance(): PersonService {
		if (!PersonService.instance) {
			this.instance = new PersonService();
		}
		return this.instance;
	}

	async GetPersons() {
		const person = AppDataSource.getRepository(PersonaDB).find();
		return await person;
	}
}

export const personService = PersonService.getInstance();
