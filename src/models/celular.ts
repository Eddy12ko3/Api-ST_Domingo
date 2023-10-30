import { Column, 
    Entity, 
    JoinColumn, 
    JoinTable, 
    ManyToMany, 
    ManyToOne, 
    PrimaryGeneratedColumn 
} from "typeorm";
import { PersonaDB } from "./persona";
import { OperatorDB } from "./operador";

@Entity()
export class CellPhoneDB{
    @PrimaryGeneratedColumn("increment")
    cellPhoneid: number

    @Column()
    cellNumber: number

    @ManyToMany(() => PersonaDB, (person) => person.cellPhones)
    persons: PersonaDB[]

    @ManyToOne(() => OperatorDB, (operator) => operator.cellphone)
    @JoinColumn({name: "operatorId"})
    operators: OperatorDB;
}