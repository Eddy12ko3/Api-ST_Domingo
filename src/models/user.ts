import { Column, Entity, JoinTable, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { PersonaDB } from "./persona";

@Entity()
@Unique(["dni"])
export class UserDB{
    @PrimaryGeneratedColumn('increment')
    userId: number;
    @Column()
    dni: number;
    @Column()
    password: string;
    
    @OneToOne((type) => PersonaDB, (person) => person.personId, {
        cascade: true,  
    })
    @JoinTable({ name: "personId" })
    persons: PersonaDB[]
}