import { Router } from "express";
import { genderController } from "../controllers/genero";

const router = Router();

router.get('/load', genderController.GetGender)

export { router } 