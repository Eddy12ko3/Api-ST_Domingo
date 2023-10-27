import { 
    Column, 
    Entity, 
    JoinColumn, 
    JoinTable, 
    ManyToMany, 
    ManyToOne, 
    PrimaryGeneratedColumn 
} from "typeorm";
import { AreasMTSDB } from "./areas";
import { SectorDB } from "./sector";
import { PersonaDB } from "./persona";

@Entity()
export class StandsDB{
    @PrimaryGeneratedColumn("increment")
    standId: number;

    @Column()
    code: string; 

    @ManyToOne(()=> AreasMTSDB, (areas) => areas.stands)
    @JoinColumn({name: "areaId"})
    areas: AreasMTSDB;

    @ManyToOne(()=> SectorDB, (sector) => sector.stands)
    @JoinColumn({name: "sectorId"})
    sector: SectorDB;

    @ManyToMany(() => PersonaDB, (person) => person.stands, {
        cascade: true
    })
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