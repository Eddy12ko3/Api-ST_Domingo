import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CellPhoneDB } from './celular';

@Entity()
export class OperatorDB {
	@PrimaryGeneratedColumn('increment')
	operatorId: number;

	@Column({
		type: 'varchar',
		length: '20',
	})
	name: string;

	@OneToMany(() => CellPhoneDB, (cellphone) => cellphone)
	cellphone: CellPhoneDB[];
}
