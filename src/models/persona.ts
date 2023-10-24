import { 
    Column, 
    CreateDateColumn, 
    Entity, 
    JoinColumn, 
    ManyToOne, 
    OneToMany, 
    OneToOne, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn 
} from "typeorm";
import { SexoDB } from "./sexo";
import { TipoDocumentoDB } from "./tipo_documento";
import { DetailPaymentDB } from "./detalle_pago";
import { AssociatesDB } from "./asociados";

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
    
    @ManyToOne(() => SexoDB, sexo => sexo.person)
    @JoinColumn({ name: "genderId" })
    gender: SexoDB;

    @ManyToOne(() => TipoDocumentoDB, (tipoDocumento) => tipoDocumento.persons)
    @JoinColumn({ name: "tipoDocId"})
    tipoDocumento: TipoDocumentoDB;

    @OneToMany(() => DetailPaymentDB, (detailpayment) => detailpayment.person)
    detailpayment: DetailPaymentDB[];

    @OneToOne(() => AssociatesDB, associate => associate.persons)
    associate: AssociatesDB;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" }) // Campo de creación
    created_at: Date;
    
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" }) // Campo de actualización
    updated_at: Date;
} 