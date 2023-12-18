"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const tipo_documento_1 = require("../controllers/tipo_documento");
const router = (0, express_1.Router)();
exports.router = router;
router.get('/load', tipo_documento_1.tipoDocumentoController.GetTipoDocumento);
