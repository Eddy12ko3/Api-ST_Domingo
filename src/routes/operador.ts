import { Router } from "express";
import { operatorController } from "../controllers/operador";

const router = Router();

router.get('/load', operatorController.GetOperators);
router.post('/create', );

export { router }