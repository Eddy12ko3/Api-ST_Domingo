import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { PersonaDB } from "./persona";
import { NumdocumentDB } from "./n_documento";

@Entity()
export class AssociatesDB{
    @PrimaryGeneratedColumn("increment")
    associateId: number

    @Column({
        nullable: false
    })
    folio: number

    @OneToOne(() => PersonaDB, (person) => person.personId, {
        cascade: true,  
    })
    @JoinColumn({name: "personId"})
    persons: PersonaDB

    @OneToOne(() => NumdocumentDB, (numdoc) => numdoc.numDocId)
    @JoinColumn({name: "numDocId"})
    numDocument: NumdocumentDB
}