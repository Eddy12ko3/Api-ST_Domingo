import {
	Column,
	Entity,
	OneToOne,
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

	@OneToOne(() => StandsDB, (stand) => stand.rubro, { onDelete: 'CASCADE' })
	stand: StandsDB;
}
