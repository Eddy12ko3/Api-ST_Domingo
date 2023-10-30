import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PersonaDB } from "./persona";
import { UserDB } from "./user";
import { NumdocumentDB } from "./n_documento";

@Entity()
export class TipoDocumentoDB{
    @PrimaryGeneratedColumn("increment")
    tipoDocId: number

    @Column()
    description: string

    @OneToMany(() => NumdocumentDB, numdocument => numdocument.tipoDocumento)
    numdocument: NumdocumentDB[];
}