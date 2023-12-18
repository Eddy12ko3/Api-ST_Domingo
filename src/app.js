"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
const app_config_1 = require("./app.config");
const genero_service_1 = require("./services/genero.service");
const tipo_document_service_1 = require("./services/tipo_document.service");
const operador_service_1 = require("./services/operador.service");
const rubros_service_1 = require("./services/rubros.service");
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.disable('X-Powered-By');
app_config_1.AppDataSource.initialize()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    genero_service_1.genderService.InsertGenero([
        'masculino',
        'femenino'
    ].map((gender) => ({ description: gender })));
    tipo_document_service_1.tipoDocumentoService.InsertTipoDoc([
        'dni',
        'carnet de extranjeria',
        'pasaporte'
    ].map((description) => ({ description: description })));
    operador_service_1.operatorService.InsertOperators([
        'bitel',
        'entel',
        'movistar',
        'claro'
    ].map((name) => ({ nameOperator: name })));
    rubros_service_1.fieldsService.InsertField([
        'Abarrotes',
        'Bazar',
        'Carnes',
        'Comedores',
        'Embutidos',
        'Frutas',
        'Golosinas',
        'Jugueria',
        'Mayorista',
        'Miscaleno',
        'Pasamaneria',
        'Pescado',
        'Pollo',
        'Porcino',
        'Tiendas',
        'Tuberculos'
    ].map(field => ({ nameField: field })));
    console.info('---->Database Connected<-----');
}))
    .catch((err) => {
    throw new Error(err);
});
app.use(routes_1.router);
app.listen(PORT, () => {
    console.log(`Listening for the Port http://localhost:${PORT}`);
});
