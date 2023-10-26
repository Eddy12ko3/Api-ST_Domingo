import { Router, Request, Response } from "express";
import { logMiddleware } from "../middleware/log";
import { checkJwt } from "../middleware/session";
import { associateController } from "../controllers/asociado";

const router = Router()
router.get("/load", associateController.getAssociates);
router.get("/load/:id", associateController.getAssociate);
router.post("/create", associateController.postAssociates);
router.put("/:id", associateController.updateAssociates);
router.delete("/:id", associateController.deleteAssociates);

export{router}