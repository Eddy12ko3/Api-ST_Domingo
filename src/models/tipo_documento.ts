import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PersonaDB } from "./persona";
import { UserDB } from "./user";

@Entity()
export class TipoDocumentoDB{
    @PrimaryGeneratedColumn("increment")
    tipoDocId: number

    @Column()
    description: string

    @OneToMany(() => PersonaDB, person => person.tipoDocumento)
    persons: PersonaDB[];

    @OneToMany(() => UserDB, user => user.tipoDocumento)
    users: UserDB[];
}