import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PersonaDB } from "./persona";
import { UserDB } from "./user";

@Entity()
export class SexoDB{
    @PrimaryGeneratedColumn("increment")
    genderId: number

    @Column()
    description: string

    @OneToMany(() => PersonaDB, persona => persona.gender)
    person: PersonaDB[];

    @OneToMany(() => UserDB, user => user.gender)
    user: UserDB[];
}