import { Router, Request, Response } from "express";
import { deleteProduct, getProduct, getProducts, postProduct, updateProduct } from "../controllers/producto";
import { logMiddleware } from "../middleware/log";
import { checkJwt } from "../middleware/session";

const router = Router()
router.get("/load",checkJwt, getProducts)
router.get("/load/:id", getProduct)
router.post("/create", postProduct)
router.put("/:id", updateProduct)
router.delete("/:id", deleteProduct)

export{router}