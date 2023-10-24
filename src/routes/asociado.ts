import { Router, Request, Response } from "express";
import { logMiddleware } from "../middleware/log";
import { checkJwt } from "../middleware/session";
import { deleteAssociates, getAssociate, getAssociates, postAssociates, updateAssociates } from "../controllers/asociado";

const router = Router()
router.get("/load", getAssociates);
router.get("/load/:id", getAssociate);
router.post("/create", postAssociates);
router.put("/:id", updateAssociates);
router.delete("/:id", deleteAssociates);

export{router}