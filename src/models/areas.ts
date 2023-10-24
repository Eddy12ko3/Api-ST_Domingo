import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { StandsDB } from "./puestos";

@Entity()
export class AreasMTSDB{
    @PrimaryGeneratedColumn("increment")
    areaId: number;

    @Column()
    size: string;

    @OneToMany(() => StandsDB, (stands) => stands.areas)
    stands: StandsDB[];
}