import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { TipoDocumentoDB } from "./tipo_documento";
import { UserDB } from "./user";

@Entity()
@Unique(['numDocument'])
export class NumdocumentDB{
    @PrimaryGeneratedColumn("increment")
    numDocId: number;

    @Column()
    numDocument: number;

    @ManyToOne(() => TipoDocumentoDB, (tipoDocumento) => tipoDocumento.numdocument)
    @JoinColumn({ name: "tipoDocId"})
    tipoDocumento: TipoDocumentoDB;

    @OneToOne(() => UserDB, (user) => user.userId)
    @JoinColumn({ name: "userId"})
    user: UserDB;  

    
}