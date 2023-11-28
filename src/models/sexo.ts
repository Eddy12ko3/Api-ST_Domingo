import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PersonaDB } from './persona';
import { UserDB } from './user';

@Entity()
export class SexoDB {
	@PrimaryGeneratedColumn('increment')
	genderId: number;

	@Column({
		type: 'varchar',
		length: '50',
	})
	description: string;

	@OneToMany(() => PersonaDB, (persona) => persona.gender)
	person: PersonaDB[];
}
