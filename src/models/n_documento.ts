import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
	Unique,
} from 'typeorm';
import { TipoDocumentoDB } from './tipo_documento';
import { UserDB } from './user';
import { AssociatesDB } from './asociados';

@Entity()
@Unique(['numDocument'])
export class NumdocumentDB {
	@PrimaryGeneratedColumn('increment')
	numDocId: number;

	@Column({
		type: 'bigint',
		nullable: false,
	})
	numDocument: number;

	@ManyToOne(() => TipoDocumentoDB, (tipoDocumento) => tipoDocumento.numdocument)
	@JoinColumn({ name: 'tipoDocId' })
	tipoDocumento: TipoDocumentoDB;

	@OneToOne(() => AssociatesDB, (associate) => associate.numDocument, {
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'associateId' })
	asocciate: AssociatesDB;

	@OneToOne(() => UserDB, (user) => user.userId)
	@JoinColumn({ name: 'userId' })
	user: UserDB;
}
