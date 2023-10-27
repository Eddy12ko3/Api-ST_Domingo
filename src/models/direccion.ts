import { Column, Entity, JoinColumn, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { PersonaDB } from "./persona";

@Entity()
export class AddressDB{
    @PrimaryGeneratedColumn()
    addressId: number;

    @Column()
    description: string;

    @ManyToMany(() => PersonaDB, (person)=> person.addresses)
    persons: PersonaDB[]
}