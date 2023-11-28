import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StandsDB } from './puestos';

@Entity()
export class AreasMTSDB {
	@PrimaryGeneratedColumn('increment')
	areaId: number;

	@Column({
		type: 'varchar',
		length: '50',
		default: '',
	})
	size: string;

	@OneToMany(() => StandsDB, (stands) => stands.areas, { onDelete: 'CASCADE' })
	stands: StandsDB[];
}
