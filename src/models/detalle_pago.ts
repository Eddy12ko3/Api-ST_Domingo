import { 
    Column, 
    Entity, 
    JoinColumn, 
    ManyToOne, 
    PrimaryGeneratedColumn } from "typeorm";
import { PersonaDB } from "./persona";

@Entity()
export class DetailPaymentDB{
    @PrimaryGeneratedColumn("increment")
    detailPaymentId: number;

    @Column()
    datePayment: Date;

    @Column()
    amount: number;

    @ManyToOne(() => PersonaDB, (person) => person.detailpayment)
    @JoinColumn({name: "personId"})
    person: PersonaDB;
}