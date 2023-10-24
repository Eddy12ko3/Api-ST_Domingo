import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { PersonaDB } from "./persona";

@Entity()
export class cellPhoneDB{
    @PrimaryGeneratedColumn("increment")
    cellPhoneid: number

    @Column()
    cellNumber: number

    @Column()
    operator: string

    @ManyToMany(() => PersonaDB)
    @JoinTable()
    persons: PersonaDB[]
}