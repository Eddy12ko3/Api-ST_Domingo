import { 
    Column, 
    Entity, 
    JoinColumn, 
    JoinTable, 
    ManyToMany, 
    ManyToOne, 
    OneToOne, 
    PrimaryGeneratedColumn 
} from "typeorm";
import { AreasMTSDB } from "./areas";
import { SectorDB } from "./sector";
import { PersonaDB } from "./persona";
import { FieldsDB } from "./rubros";

@Entity()
export class StandsDB{
    @PrimaryGeneratedColumn("increment")
    standId: number;

    @Column()
    code: string; 

    @ManyToOne(()=> AreasMTSDB, (areas) => areas.stands, {
        cascade: true
    })
    @JoinColumn({name: "areaId"})
    areas: AreasMTSDB;

    @ManyToOne(()=> SectorDB, (sector) => sector.stands,{
        cascade: true
    })
    @JoinColumn({name: "sectorId"})
    sector: SectorDB;

    @ManyToMany(() => PersonaDB, (person) => person.stands, {
        cascade: true
    })

    @OneToOne(() => FieldsDB, (field) => field.fieldId, {
        cascade: true
    })
    @JoinColumn({name: "fieldId"})
    rubro: FieldsDB;

    @JoinTable({
        name: 'stands_db_persons_person_db',
        joinColumn: {
            name: 'standId',
            referencedColumnName: 'standId'
        },
        inverseJoinColumn: {
            name: 'personId',
            referencedColumnName: 'personId'
        }
    })
    persons: PersonaDB[]
}