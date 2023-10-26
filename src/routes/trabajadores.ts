import { Router } from "express";
import { workerController } from "../controllers/trabajadores";

const router = Router()
router.get("/load", workerController.GetWorkers);
router.get("/load/:id", );
router.post("/create", workerController.PostWorker);
router.put("/:id", workerController.UpdateWorker);
router.delete("/:id", workerController.DeleteWorker);

export{router}
