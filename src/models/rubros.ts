import {
	Column,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { StandsDB } from './puestos';

@Entity()
export class FieldsDB {
	@PrimaryGeneratedColumn('increment')
	fieldId: number;

	@Column({
		type: 'varchar',
		length: '100',
	})
	nameField: string;

	@OneToMany(() => StandsDB, (stand) => stand.rubro, { onDelete: 'CASCADE' })
	stand: StandsDB[];
}
