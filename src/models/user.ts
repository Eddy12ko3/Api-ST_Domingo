import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserDB{
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column()
    nombre: string;
    @Column()
    dni: number;
    @Column()
    email: string;
    @Column()
    password: string;
}