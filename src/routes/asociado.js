"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const session_1 = require("../middleware/session");
const asociado_1 = require("../controllers/asociado");
const router = (0, express_1.Router)();
exports.router = router;
router.get('/load', session_1.checkJwt, asociado_1.associateController.getAssociates);
router.get('/load/:id', session_1.checkJwt, asociado_1.associateController.getAssociate);
router.post('/create', session_1.checkJwt, asociado_1.associateController.postAssociates);
router.put('/update/:id', session_1.checkJwt, asociado_1.associateController.updateAssociates);
router.delete('/delete/:id', session_1.checkJwt, asociado_1.associateController.deleteAssociates);
