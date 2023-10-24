import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { PersonaDB } from "./persona";

@Entity()
@Unique(["dni"])
export class AssociatesDB{
    @PrimaryGeneratedColumn("increment")
    associateId: number

    @Column()
    folio: number

    @Column()
    dni: number

    @OneToOne(() => PersonaDB, (person) => person.personId, {
        cascade: true,  
    })
    persons: PersonaDB[]
}