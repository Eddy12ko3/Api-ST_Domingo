import { Router, Request, Response } from "express";
import { deleteProduct, getProduct, getProducts, postProduct, updateProduct } from "../controllers/producto";
import { logMiddleware } from "../middleware/log";

const router = Router()
router.get("/",logMiddleware, getProducts)
router.get("/:id", getProduct)
router.post("/", postProduct)
router.put("/:id", updateProduct)
router.delete("/:id", deleteProduct)

export{router}