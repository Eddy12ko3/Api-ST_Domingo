import { Router } from "express";
import { personController } from "../controllers/persona";

const router = Router()

router.get("/load", personController.GetPersons)

export {router}