import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity()
export class UserDB {
	@PrimaryGeneratedColumn('increment')
	userId: number;

	@Column({
		type: 'varchar',
		nullable: false,
	})
	password: string;

	@Column({
		type: 'varchar',
		length: '100',
		default: '',
	})
	name: string;

	@Column({
		type: 'varchar',
		length: '100',
		default: '',
	})
	lastname: string;

	@Column()
	date_birth: Date;

	@Column({
		type: 'boolean',
		default: true,
	})
	state: boolean;

	@CreateDateColumn({
		type: 'timestamp',
		default: () => 'CURRENT_TIMESTAMP(6)',
	}) // Campo de creación
	created_at: Date;

	@UpdateDateColumn({
		type: 'timestamp',
		default: () => 'CURRENT_TIMESTAMP(6)',
		onUpdate: 'CURRENT_TIMESTAMP(6)',
	}) // Campo de actualización
	updated_at: Date;
}
