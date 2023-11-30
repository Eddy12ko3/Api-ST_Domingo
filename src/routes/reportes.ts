import { Router } from "express";
import { reportController } from "../controllers/reportes";

const router = Router();

router.get('/load', reportController.getReports);

export { router } 