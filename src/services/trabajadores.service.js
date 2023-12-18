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
exports.workersService = void 0;
const app_config_1 = require("../app.config");
const trabajadores_1 = require("../models/trabajadores");
const bcrypt_handle_1 = require("../utils/bcrypt.handle");
const jwt_handle_1 = require("../utils/jwt.handle");
class WorkersService {
    static getInstance() {
        if (!WorkersService.instance) {
            this.instance = new WorkersService();
        }
        return this.instance;
    }
    InsertWorker({ dni, nombre, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newWorker = new trabajadores_1.WorkersDB();
                newWorker.dni = dni;
                newWorker.nombre = nombre;
                const passHash = yield (0, bcrypt_handle_1.encrypt)(password);
                newWorker.password = passHash;
                const responseInsert = yield app_config_1.AppDataSource.getRepository(trabajadores_1.WorkersDB).save(newWorker);
                return responseInsert;
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    LogWorker({ dni, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield app_config_1.AppDataSource.getRepository(trabajadores_1.WorkersDB).findOneBy({
                dni,
            });
            if (!user)
                throw new Error('WORKER_NOT_FOUND');
            const passwordHash = user.password;
            const isCorrect = yield (0, bcrypt_handle_1.verified)(password, passwordHash);
            if (!isCorrect)
                throw new Error('PASSWORD_INCORRECT');
            const token = (0, jwt_handle_1.generateToken)(user.dni.toString());
            return token;
        });
    }
    GetWorkers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const responseWorkers = yield app_config_1.AppDataSource.getRepository(trabajadores_1.WorkersDB).find();
                return responseWorkers;
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    UpdateWorker(id, { dni, nombre, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const workerObj = yield app_config_1.AppDataSource.getRepository(trabajadores_1.WorkersDB).findOne({
                    where: {
                        workedId: parseInt(id),
                    },
                });
                if (!workerObj)
                    throw new Error('WORKER_NOT_FOUND');
                workerObj.dni = dni;
                workerObj.nombre = nombre;
                workerObj.password = password;
                const responseUpdate = yield app_config_1.AppDataSource.getRepository(trabajadores_1.WorkersDB).save(workerObj);
                return responseUpdate;
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    DeleteWorker(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const workerDelete = yield app_config_1.AppDataSource.getRepository(trabajadores_1.WorkersDB).findOne({
                    where: {
                        workedId: parseInt(id),
                    },
                });
                if (!workerDelete)
                    throw new Error('WORKER_NOT_FOUND');
                const responseDelete = yield app_config_1.AppDataSource.getRepository(trabajadores_1.WorkersDB).remove(workerDelete);
                return responseDelete;
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
}
exports.workersService = WorkersService.getInstance();
