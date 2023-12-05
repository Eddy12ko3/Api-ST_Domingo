import {
	Column,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { AreasMTSDB } from './areas';
import { SectorDB } from './sector';
import { PersonaDB } from './persona';
import { FieldsDB } from './rubros';

@Entity()
export class StandsDB {
	@PrimaryGeneratedColumn('increment')
	standId: number;

	@Column({
		type: 'varchar',
		length: '100',
		nullable: false,
	})
	code: string;

	@ManyToOne(() => AreasMTSDB, (areas) => areas.stands, {
		cascade: true,
	})
	@JoinColumn({ name: 'areaId' })
	areas: AreasMTSDB;

	@ManyToOne(() => SectorDB, (sector) => sector.stands, {
		cascade: true,
	})
	@JoinColumn({ name: 'sectorId' })
	sector: SectorDB;

	@ManyToOne(() => FieldsDB, (field) => field.stand, {
		cascade: true,
	})
	@JoinColumn({ name: 'fieldId' })
	rubro: FieldsDB;

	@ManyToMany(() => PersonaDB, (person) => person.stands, {
		onDelete: 'CASCADE',
	})
	persons: PersonaDB[];
}
