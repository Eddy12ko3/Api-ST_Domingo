import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PersonaDB } from "./persona";

@Entity()
export class SexoDB{
    @PrimaryGeneratedColumn("increment")
    genderId: number

    @Column()
    description: string

    @OneToMany(() => PersonaDB, persona => persona.gender)
    persona: PersonaDB[];
}