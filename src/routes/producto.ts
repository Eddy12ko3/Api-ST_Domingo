import { Router, Request, Response } from "express";
import { deleteProduct, getProduct, getProducts, postProduct, updateProduct } from "../controllers/producto";
import { logMiddleware } from "../middleware/log";

const router = Router()
router.get("/load",logMiddleware, getProducts)
router.get("/load/:id", getProduct)
router.post("/create", postProduct)
router.put("/:id", updateProduct)
router.delete("/:id", deleteProduct)

export{router}