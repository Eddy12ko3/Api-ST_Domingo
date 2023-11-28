import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['dni'])
export class WorkersDB {
	@PrimaryGeneratedColumn('increment')
	workedId: number;

	@Column({
		type: 'varchar',
		length: '100',
		default: '',
	})
	nombre: string;

	@Column()
	dni: number;

	@Column()
	password: string;
}
