import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PersonaDB } from "./persona";

@Entity()
export class TipoDocumentoDB{
    @PrimaryGeneratedColumn("increment")
    tipoDocId: number

    @Column()
    description: string

    @OneToMany(() => PersonaDB, person => person.tipoDocumento)
    persons: PersonaDB[];
}