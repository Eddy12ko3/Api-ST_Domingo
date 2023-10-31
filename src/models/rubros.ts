import { Column, Entity, JoinColumn, JoinTable, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { StandsDB } from "./puestos";

@Entity()
export class FieldsDB{
    @PrimaryGeneratedColumn("increment")
    fieldId: number;

    @Column()
    nameField: string;

}