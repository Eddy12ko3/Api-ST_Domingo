import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductoDB {
	@PrimaryGeneratedColumn('increment')
	productoId: number;

	@Column({
		type: 'varchar',
		length: '20',
		default: '',
	})
	code: string;

	@Column({
		type: 'varchar',
		length: '50',
		default: '',
	})
	name: string;

	@Column({
		type: 'varchar',
		length: '1025',
		default: '',
	})
	details: string;

	@Column({
		type: 'varchar',
		length: '50',
		default: '',
	})
	marca: string;

	@Column({
		type: 'varchar',
		length: '10',
		default: '',
	})
	unit: string;

	@Column({
		type: 'decimal',
		precision: 10,
		scale: 2,
		default: 0,
	})
	priceDistributor: number;

	@Column({
		type: 'decimal',
		precision: 10,
		scale: 2,
		default: 0,
	})
	priceProduct: number;

	@Column({
		type: 'varchar',
		length: 250,
		default: '',
	})
	image: string;

	@Column({
		type: 'decimal',
		precision: 10,
		scale: 2,
		default: 0,
	})
	commission: number;

	@Column({
		type: 'boolean',
		default: true,
	})
	tax: boolean;

	@Column({
		type: 'boolean',
		default: true,
	})
	expired: boolean;

	@Column({
		type: 'int',
		default: 0,
	})
	stock_min: number;

	@Column({
		type: 'int',
		default: 0,
	})
	stock_max: number;

	@Column({
		type: 'boolean',
		default: true,
	})
	status: boolean;
}
