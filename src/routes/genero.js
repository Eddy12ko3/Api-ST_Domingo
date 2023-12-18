"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const genero_1 = require("../controllers/genero");
const router = (0, express_1.Router)();
exports.router = router;
router.get('/load', genero_1.genderController.GetGender);
