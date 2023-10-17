import { Column, Entity, JoinColumn, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { PersonaDB } from "./persona";

@Entity()
export class AddressDB{
    @PrimaryGeneratedColumn()
    addressId: number;

    @Column()
    description: string;

    @ManyToMany(() => PersonaDB, personadb => personadb.address)
    @JoinColumn({name: "personId"})
    persons: PersonaDB
}