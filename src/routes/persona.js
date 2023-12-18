"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const persona_1 = require("../controllers/persona");
const session_1 = require("../middleware/session");
const router = (0, express_1.Router)();
exports.router = router;
router.get('/load', session_1.checkJwt, persona_1.personController.GetPersons);
