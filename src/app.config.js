"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const user_1 = require("./models/user");
const producto_1 = require("./models/producto");
const persona_1 = require("./models/persona");
const sexo_1 = require("./models/sexo");
const tipo_documento_1 = require("./models/tipo_documento");
const celular_1 = require("./models/celular");
const rubros_1 = require("./models/rubros");
const direccion_1 = require("./models/direccion");
const sector_1 = require("./models/sector");
const areas_1 = require("./models/areas");
const puestos_1 = require("./models/puestos");
const asociados_1 = require("./models/asociados");
const detalle_pago_1 = require("./models/detalle_pago");
const trabajadores_1 = require("./models/trabajadores");
const n_documento_1 = require("./models/n_documento");
const operador_1 = require("./models/operador");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.PORT_DB, 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [
        user_1.UserDB,
        producto_1.ProductoDB,
        persona_1.PersonaDB,
        sexo_1.SexoDB,
        tipo_documento_1.TipoDocumentoDB,
        celular_1.CellPhoneDB,
        rubros_1.FieldsDB,
        direccion_1.AddressDB,
        sector_1.SectorDB,
        areas_1.AreasMTSDB,
        puestos_1.StandsDB,
        asociados_1.AssociatesDB,
        detalle_pago_1.DetailPaymentDB,
        trabajadores_1.WorkersDB,
        n_documento_1.NumdocumentDB,
        operador_1.OperatorDB,
    ],
    subscribers: [],
    migrations: [],
});
