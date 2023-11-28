import { Router } from "express";
import { fieldsController } from "../controllers/rubro";

const router = Router()

router.get('/load', fieldsController.GetField)
router.post('/create', )
export { router }