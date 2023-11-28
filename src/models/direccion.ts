import { Column, Entity, JoinColumn, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PersonaDB } from './persona';

@Entity()
export class AddressDB {
	@PrimaryGeneratedColumn()
	addressId: number;

	@Column({
		type: 'varchar',
		length: 100,
		default: '',
	})
	description: string;

	@ManyToMany(() => PersonaDB, (person) => person.addresses, {
		onDelete: 'CASCADE',
	})
	persons: PersonaDB[];
}
