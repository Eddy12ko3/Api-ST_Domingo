import { 
    Column, 
    CreateDateColumn, 
    Entity, 
    JoinColumn, 
    JoinTable, 
    ManyToMany, 
    ManyToOne, 
    OneToMany, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn 
} from "typeorm";
import { SexoDB } from "./sexo";
import { TipoDocumentoDB } from "./tipo_documento";
import { DetailPaymentDB } from "./detalle_pago";
import { AddressDB } from "./direccion";
import { CellPhoneDB } from "./celular";

@Entity()
export class PersonaDB{
    @PrimaryGeneratedColumn("increment")
    personId: number
    
    @Column({
        type: 'varchar',
        length: '100',
        default: ''
    })
    name: string;

    @Column({
        type: 'varchar',
        length: '100',
        default: ''
    })
    lastname: string;

    @Column({
        type: 'varchar',
        length: '50',
        default: ''
    })
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

    @ManyToOne(() => SexoDB, sexo => sexo.person)
    @JoinColumn({ name: "genderId" })
    gender: SexoDB;

    @ManyToOne(() => TipoDocumentoDB, (tipoDocumento) => tipoDocumento.persons)
    @JoinColumn({ name: "tipoDocId"})
    tipoDocumento: TipoDocumentoDB;

    @OneToMany(() => DetailPaymentDB, (detailpayment) => detailpayment.person)
    detailpayment: DetailPaymentDB[];

    @ManyToMany(()=> AddressDB, (address) => address.persons, {
        cascade: true,
    })
    @JoinTable({
        name: 'person_db_addresses_address_db',
        joinColumn: {
            name: 'personId',
            referencedColumnName: 'personId',
        },
        inverseJoinColumn: {
            name: 'addressId',
            referencedColumnName: 'addressId',
        }
    })
    addresses: AddressDB[];

    @ManyToMany(()=> CellPhoneDB, (cellphone) => cellphone.persons,{
        cascade: true,
    })
    @JoinTable({
        name: 'person_db_cellPhones_cellphone_db',
        joinColumn: {
            name: 'personId',
            referencedColumnName: 'personId',
        },
        inverseJoinColumn: {
            name: 'cellPhoneid',
            referencedColumnName: 'cellPhoneid',
        }
    })
    cellPhones: CellPhoneDB[];
    
} 