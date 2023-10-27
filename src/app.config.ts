import { DataSource } from "typeorm";
import { UserDB } from "./models/user";
import { ProductoDB  } from "./models/producto";
import { PersonaDB } from "./models/persona";
import { SexoDB } from "./models/sexo";
import { TipoDocumentoDB } from "./models/tipo_documento";
import { CellPhoneDB } from "./models/celular";
import { FieldsDB } from "./models/rubros";
import { AddressDB } from "./models/direccion";
import { SectorDB } from "./models/sector";
import { AreasMTSDB } from "./models/areas";
import { StandsDB } from "./models/puestos";
import { AssociatesDB } from "./models/asociados";
import { DetailPaymentDB } from "./models/detalle_pago";
import { WorkersDB } from "./models/trabajadores";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "apitest",
    synchronize: true,
    logging: false,
    entities: [
        UserDB, 
        ProductoDB, 
        PersonaDB, 
        SexoDB, 
        TipoDocumentoDB, 
        CellPhoneDB,
        FieldsDB,
        AddressDB, 
        SectorDB,
        AreasMTSDB,
        StandsDB,
        AssociatesDB,
        DetailPaymentDB,
        WorkersDB
    ],
    subscribers: [],
    migrations: [],
})