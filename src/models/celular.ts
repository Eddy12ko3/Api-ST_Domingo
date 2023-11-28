import {
	Column,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { PersonaDB } from './persona';
import { OperatorDB } from './operador';

@Entity()
export class CellPhoneDB {
	@PrimaryGeneratedColumn('increment')
	cellPhoneid: number;

	@Column({
		type: 'int',
		default: 0,
	})
	cellNumber: number;

	@ManyToMany(() => PersonaDB, (person) => person.cellPhones, {
		onDelete: 'CASCADE',
	})
	persons: PersonaDB[];

	@ManyToOne(() => OperatorDB, (operator) => operator.cellphone)
	@JoinColumn({ name: 'operatorId' })
	operators: OperatorDB;
}
