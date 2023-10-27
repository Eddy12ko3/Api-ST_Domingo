import { Column, 
    Entity, 
    JoinTable, 
    ManyToMany, 
    PrimaryGeneratedColumn 
} from "typeorm";
import { PersonaDB } from "./persona";

@Entity()
export class CellPhoneDB{
    @PrimaryGeneratedColumn("increment")
    cellPhoneid: number

    @Column()
    cellNumber: number

    @Column()
    operator: string

    @ManyToMany(() => PersonaDB, (person) => person.cellPhones)
    persons: PersonaDB[]
}