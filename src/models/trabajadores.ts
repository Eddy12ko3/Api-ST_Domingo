import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(["dni"])
export class WorkersDB{
    @PrimaryGeneratedColumn("increment")
    workedId: number

    @Column()
    nombre: string

    @Column()
    dni: number

    @Column()
    password: string
}