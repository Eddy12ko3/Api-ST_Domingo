"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const operador_1 = require("../controllers/operador");
const router = (0, express_1.Router)();
exports.router = router;
router.get('/load', operador_1.operatorController.GetOperators);
router.post('/create');
