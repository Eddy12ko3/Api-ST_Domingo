import { Column, Entity, JoinColumn, JoinTable, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PersonaDB } from "./persona";

@Entity()
export class FieldsDB{
    @PrimaryGeneratedColumn("increment")
    fieldId: number;

    @Column()
    nameField: string;

    @OneToOne(() => PersonaDB, (person) => person.personId)
    @JoinColumn({name: "personId"})
    persons: PersonaDB[];
}