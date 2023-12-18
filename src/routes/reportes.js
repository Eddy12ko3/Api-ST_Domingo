"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const reportes_1 = require("../controllers/reportes");
const router = (0, express_1.Router)();
exports.router = router;
router.get('/load', reportes_1.reportController.getReports);
