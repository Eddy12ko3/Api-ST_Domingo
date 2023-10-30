import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { SexoDB } from "./sexo";
import { TipoDocumentoDB } from "./tipo_documento";
import { NumdocumentDB } from "./n_documento";

@Entity()
export class UserDB{
    @PrimaryGeneratedColumn('increment')
    userId: number;

    @Column({
        type: 'varchar',
        nullable: false
    })
    password: string;

    @Column({
        type: 'varchar',
        length: '100',
        default: ''
    })
    name: string;

    @Column({
        type: "varchar",
        length: '100',
        default: ""
    })
    lastname: string;

    @Column()
    date_birth: Date;

    @Column({
        type: 'boolean',
        default: true
    })
    state: boolean;

    @CreateDateColumn({
        type: "timestamp", 
        default: () => "CURRENT_TIMESTAMP(6)" 
    }) // Campo de creación
    created_at: Date;

    @UpdateDateColumn({ 
        type: "timestamp", 
        default: () => "CURRENT_TIMESTAMP(6)", 
        onUpdate: "CURRENT_TIMESTAMP(6)" 
    }) // Campo de actualización
    updated_at: Date;

    @ManyToOne(() => SexoDB, sexo => sexo.user)
    @JoinColumn({ name: "genderId" })
    gender: SexoDB;

    
}