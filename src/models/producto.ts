import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductoDB{
    @PrimaryGeneratedColumn("increment")
    id: number

    @Column()
    nombre: string

    @Column()
    precio: number

    @Column()
    cantidad: number

    @Column()
    estado: boolean
    
}