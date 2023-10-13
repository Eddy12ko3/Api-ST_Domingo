import { DataSource } from "typeorm";
import { UserDB } from "./models/user";
import { ProductoDB  } from "./models/producto";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "apitest",
    synchronize: true,
    logging: true,
    entities: [UserDB, ProductoDB],
    subscribers: [],
    migrations: [],
})