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
exports.workerController = void 0;
const trabajadores_service_1 = require("../services/trabajadores.service");
const err_handle_1 = require("../utils/err.handle");
class WorkersController {
    static getinstance() {
        if (!WorkersController.instance) {
            this.instance = new WorkersController();
        }
        return this.instance;
    }
    LoginWorker(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { dni, password } = req.body;
                const response = yield trabajadores_service_1.workersService.LogWorker({
                    dni,
                    password,
                });
                return res.status(200).json(response);
            }
            catch (e) {
                (0, err_handle_1.handleHttp)(res, 'ERR_LOGIN_WORKER', e.message);
            }
        });
    }
    PostWorker(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { dni, nombre, password } = req.body;
                const response = yield trabajadores_service_1.workersService.InsertWorker({
                    dni,
                    nombre,
                    password,
                });
                return res.status(200).json({
                    message: 'trabajador insertado correctamente',
                });
            }
            catch (e) {
                (0, err_handle_1.handleHttp)(res, 'ERR_POST_WORKER', e.message);
            }
        });
    }
    GetWorkers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield trabajadores_service_1.workersService.GetWorkers();
                if (response) {
                    return res.status(200).json(response);
                }
                else {
                    return res.status(404).json({
                        message: 'No hay registros',
                    });
                }
            }
            catch (e) {
                (0, err_handle_1.handleHttp)(res, 'ERR_GET_WORKERS', e.message);
            }
        });
    }
    UpdateWorker(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { dni, nombre, password } = req.body;
                const response = yield trabajadores_service_1.workersService.UpdateWorker(id, {
                    dni,
                    nombre,
                    password,
                });
                if (response) {
                    return res.status(200).json(response);
                }
                else {
                    return res.status(404).json({ message: 'No hay registros' });
                }
            }
            catch (e) {
                (0, err_handle_1.handleHttp)(res, 'ERR_UPDATE_WORKERS', e.message);
            }
        });
    }
    DeleteWorker(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const response = yield trabajadores_service_1.workersService.DeleteWorker(id);
                if (response) {
                    res.status(200).json({ message: 'Trabajador borrado correctamente' });
                }
                else {
                    res.status(404).json({ message: 'Trabajador not found' });
                }
            }
            catch (e) {
                (0, err_handle_1.handleHttp)(res, 'ERR_DELETE_WORKERS', e.message);
            }
        });
    }
}
exports.workerController = WorkersController.getinstance();
