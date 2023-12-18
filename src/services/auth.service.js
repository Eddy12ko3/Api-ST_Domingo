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
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const app_config_1 = require("../app.config");
const n_documento_1 = require("../models/n_documento");
const tipo_documento_1 = require("../models/tipo_documento");
const user_1 = require("../models/user");
const bcrypt_handle_1 = require("../utils/bcrypt.handle");
const jwt_handle_1 = require("../utils/jwt.handle");
class AuthService {
    constructor() {
        this.registerNewUser = ({ numDocument, password, name, lastname, date_birth, document, }) => __awaiter(this, void 0, void 0, function* () {
            try {
                const checksIs = yield app_config_1.AppDataSource.getRepository(n_documento_1.NumdocumentDB).findOneBy({
                    numDocument,
                });
                if (checksIs)
                    throw new Error('Este Usuario ya ha sido registrado');
                const documentObj = yield app_config_1.AppDataSource.getRepository(tipo_documento_1.TipoDocumentoDB).findOne({
                    where: {
                        tipoDocId: document,
                    },
                });
                if (!documentObj)
                    throw new Error('Documento no encontrado');
                const newUser = new user_1.UserDB();
                newUser.name = name;
                newUser.lastname = lastname;
                newUser.date_birth = date_birth;
                const passHash = yield (0, bcrypt_handle_1.encrypt)(password);
                newUser.password = passHash;
                yield app_config_1.AppDataSource.getRepository(user_1.UserDB).save(newUser);
                const newNumDocument = new n_documento_1.NumdocumentDB();
                newNumDocument.numDocument = numDocument;
                newNumDocument.tipoDocumento = documentObj;
                newNumDocument.user = newUser;
                const responseInsert = yield app_config_1.AppDataSource.getRepository(n_documento_1.NumdocumentDB).save(newNumDocument);
                return responseInsert;
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
        this.loginUser = ({ numDocument, password }) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield app_config_1.AppDataSource.getRepository(n_documento_1.NumdocumentDB).findOne({
                    where: {
                        numDocument,
                    },
                    relations: {
                        user: true,
                    },
                    select: {
                        user: {
                            name: true,
                            lastname: true,
                            password: true,
                        },
                    },
                });
                if (!(user === null || user === void 0 ? void 0 : user.user))
                    throw new Error('Usuario no encontrado');
                if (!user)
                    throw new Error('Usuario no encontrado');
                const passwordHash = user.user.password;
                const isCorrect = yield (0, bcrypt_handle_1.verified)(password, passwordHash);
                if (!isCorrect)
                    throw new Error('Contraseña incorrecta');
                const data = {
                    user: user.numDocument,
                    username: user.user.name,
                    userlastname: user.user.lastname,
                };
                const token = (0, jwt_handle_1.generateToken)(JSON.stringify(data));
                return token;
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    static getInstance() {
        if (!AuthService.instance) {
            this.instance = new AuthService();
        }
        return this.instance;
    }
}
exports.authService = AuthService.getInstance();
