import { Router, Request, Response } from "express";
import { logMiddleware } from "../middleware/log";
import { checkJwt } from "../middleware/session";
import { detailPaymentController } from "../controllers/pagos";

const router = Router()
router.get("/load", detailPaymentController.GetPayment)
router.get("/load/:id", )
router.post("/create", detailPaymentController.InsertPayment)
router.put("/update/:id", detailPaymentController.UpdatePayment)
router.delete("/delete/:id", detailPaymentController.DeletePayment)

export{router}