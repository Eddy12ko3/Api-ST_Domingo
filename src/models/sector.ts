import { Column, Entity, JoinColumn, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StandsDB } from './puestos';

@Entity()
export class SectorDB {
	@PrimaryGeneratedColumn('increment')
	sectorId: number;

	@Column({
		type: 'varchar',
		length: '50',
	})
	code: string;

	@OneToMany(() => StandsDB, (stands) => stands.sector, { onDelete: 'CASCADE' })
	stands: StandsDB[];
}
