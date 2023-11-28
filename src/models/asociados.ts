import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { PersonaDB } from './persona';
import { NumdocumentDB } from './n_documento';

@Entity()
export class AssociatesDB {
	@PrimaryGeneratedColumn('increment')
	associateId: number;

	@Column({
		type: 'int',
		default: 0,
		nullable: false,
	})
	folio: number;

	@OneToOne(() => PersonaDB, (person) => person.asocciate, {
		cascade: true,
	})
	persons: PersonaDB;

	@OneToOne(() => NumdocumentDB, (numdoc) => numdoc.asocciate, {
		cascade: true,
	})
	numDocument: NumdocumentDB;
}
