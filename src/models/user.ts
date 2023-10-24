import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { SexoDB } from "./sexo";
import { TipoDocumentoDB } from "./tipo_documento";

@Entity()
@Unique(["dni"])
export class UserDB{
    @PrimaryGeneratedColumn('increment')
    userId: number;
    @Column()
    dni: number;
    @Column()
    password: string;
    
    @Column()
    name: string;

    @Column()
    lastname: string;

    @Column()
    date_birth: Date;

    @Column({default: 1})
    state: number;
    
    @ManyToOne(() => SexoDB, sexo => sexo.user)
    @JoinColumn({ name: "genderId" })
    gender: SexoDB;

    @ManyToOne(() => TipoDocumentoDB, (tipoDocumento) => tipoDocumento.users)
    @JoinColumn({ name: "tipoDocId"})
    tipoDocumento: TipoDocumentoDB;
}