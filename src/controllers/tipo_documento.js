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
exports.tipoDocumentoController = void 0;
const tipo_document_service_1 = require("../services/tipo_document.service");
const err_handle_1 = require("../utils/err.handle");
class TipoDocumentoController {
    static getInstance() {
        if (!TipoDocumentoController.instance) {
            this.instance = new TipoDocumentoController();
        }
        return this.instance;
    }
    GetTipoDocumento(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield tipo_document_service_1.tipoDocumentoService.GetTipoDoc();
                return res.status(200).json(response);
            }
            catch (e) {
                (0, err_handle_1.handleHttp)(res, "Error al obtener los datos", e.message);
            }
        });
    }
}
exports.tipoDocumentoController = TipoDocumentoController.getInstance();
