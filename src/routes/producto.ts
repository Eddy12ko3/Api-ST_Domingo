import { Router, Request, Response } from "express";
import { deleteProduct, getProduct, getProducts, postProduct, updateProduct } from "../controllers/producto";

const router = Router()
router.get("/", getProducts)
router.get("/:id", getProduct)
router.post("/", postProduct)
router.put("/:id", updateProduct)
router.delete("/:id", deleteProduct)

export{router}