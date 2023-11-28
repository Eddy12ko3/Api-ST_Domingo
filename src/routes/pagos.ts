import { Router, Request, Response } from 'express';
import { logMiddleware } from '../middleware/log';
import { checkJwt } from '../middleware/session';
import { detailPaymentController } from '../controllers/pagos';

const router = Router();
router.get('/load', checkJwt, detailPaymentController.GetPayment);
router.get('/load/:id');
router.post('/create', checkJwt, detailPaymentController.InsertPayment);
router.put('/update/:id', checkJwt, detailPaymentController.UpdatePayment);
router.delete('/delete/:id', checkJwt, detailPaymentController.DeletePayment);

export { router };
