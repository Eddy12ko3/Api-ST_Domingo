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
exports.associateController = void 0;
const asociados_service_1 = require("../services/asociados.service");
const err_handle_1 = require("../utils/err.handle");
class AssociateController {
    constructor() {
        this.postAssociates = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { folio, numDocument, name, lastname, date_birth, gender, document, direccion, celular, operador, code, area, sector, rubro, } = req.body;
                const response = yield asociados_service_1.associateService.InsertAssociate({
                    folio,
                    numDocument,
                    name,
                    lastname,
                    date_birth,
                    gender,
                    document,
                    direccion,
                    celular,
                    operador,
                    code,
                    area,
                    sector,
                    rubro,
                });
                if (response) {
                    console.log(response);
                    res.status(200).json({
                        success: 'Asociado agregado Correctamente',
                    });
                }
                else {
                    res.status(404).json({
                        error: 'Error al agregar un asociado',
                    });
                }
            }
            catch (e) {
                (0, err_handle_1.handleHttp)(res, 'Error al agregar el asociado', e.message);
            }
        });
        this.getAssociate = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (e) {
                (0, err_handle_1.handleHttp)(res, 'Error al obtener el registro', e.message);
            }
        });
        this.getAssociates = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield asociados_service_1.associateService.GetAssociates();
                if (response.length > 0) {
                    return res.status(200).json(response);
                }
                else {
                    return res.json({ message: 'No hay registros' });
                }
            }
            catch (e) {
                (0, err_handle_1.handleHttp)(res, 'Error al obtener los registros', e.message);
            }
        });
        this.updateAssociates = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { folio, numDocument, name, lastname, date_birth, gender, document, direccion, celular, operador, code, area, sector, rubro, } = req.body;
                const response = yield asociados_service_1.associateService.UpdateAssociates(id, {
                    folio,
                    numDocument,
                    name,
                    lastname,
                    date_birth,
                    gender,
                    document,
                    direccion,
                    celular,
                    operador,
                    code,
                    area,
                    sector,
                    rubro,
                });
                if (response) {
                    res.status(200).json({
                        success: 'Asociado modificado correctamente',
                    });
                }
                else {
                    res.status(404).json({
                        error: 'Error al modificar un asociado',
                    });
                }
            }
            catch (e) {
                (0, err_handle_1.handleHttp)(res, 'Error al modificar el asociado', e.message);
            }
        });
        this.deleteAssociates = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const response = yield asociados_service_1.associateService.DeleteAssociate(id);
                if (response) {
                    res.status(200).json({
                        success: 'Asociado borrado correctamente',
                    });
                }
                else {
                    res.status(404).json({
                        error: 'Error al eliminar un asociado',
                    });
                }
            }
            catch (e) {
                (0, err_handle_1.handleHttp)(res, 'Error al eliminar el asociado', e.message);
            }
        });
    }
    static getInstance() {
        if (!AssociateController.instance) {
            this.instance = new AssociateController();
        }
        return this.instance;
    }
}
exports.associateController = AssociateController.getInstance();
