import { DataSource } from "typeorm";
import { UserDB } from "./models/user";
import { ProductoDB  } from "./models/producto";
import { PersonaDB } from "./models/persona";
import { SexoDB } from "./models/sexo";
import { TipoDocumentoDB } from "./models/tipo_documento";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3307,
    username: "root",
    password: "root",
    database: "apitest",
    synchronize: true,
    logging: true,
    entities: [UserDB, ProductoDB, PersonaDB, SexoDB, TipoDocumentoDB],
    subscribers: [],
    migrations: [],
})