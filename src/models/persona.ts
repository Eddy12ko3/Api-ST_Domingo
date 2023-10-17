import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { SexoDB } from "./sexo";
import { TipoDocumentoDB } from "./tipo_documento";
import { AddressDB } from "./direccion";

@Entity()
export class PersonaDB{
    @PrimaryGeneratedColumn("increment")
    personId: number
    
    @Column()
    name: string;

    @Column()
    lastname: string;

    @Column()
    date_birth: Date;

    @Column({default: 1})
    state: number;
    
    @ManyToOne(() => SexoDB, sexo => sexo.persona)
    @JoinColumn({ name: "genderId" })
    gender: SexoDB;

    @ManyToOne(() => TipoDocumentoDB, tipoDocumento => tipoDocumento.persons)
    @JoinColumn({ name: "tipoDocId"})
    tipoDocumento: TipoDocumentoDB;

    @ManyToMany(() => AddressDB, address => address.persons)
    address: AddressDB[];

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" }) // Campo de creación
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" }) // Campo de actualización
    updated_at: Date;
} 