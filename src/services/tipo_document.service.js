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
exports.tipoDocumentoService = void 0;
const app_config_1 = require("../app.config");
const tipo_documento_1 = require("../models/tipo_documento");
class TipoDocumentoService {
    static getInstance() {
        if (!TipoDocumentoService.instance) {
            this.instance = new TipoDocumentoService();
        }
        return this.instance;
    }
    InsertTipoDoc(tipoDocs) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const docrepo = app_config_1.AppDataSource.getRepository(tipo_documento_1.TipoDocumentoDB);
                for (const tipoDoc of tipoDocs) {
                    const exist = yield docrepo.exist({
                        where: {
                            description: tipoDoc.description
                        },
                    });
                    if (!exist) {
                        const document = new tipo_documento_1.TipoDocumentoDB();
                        document.description = tipoDoc.description;
                        yield docrepo.save(document);
                    }
                }
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    GetTipoDoc() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield app_config_1.AppDataSource.getRepository(tipo_documento_1.TipoDocumentoDB).find();
                return response;
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
}
;
exports.tipoDocumentoService = TipoDocumentoService.getInstance();
