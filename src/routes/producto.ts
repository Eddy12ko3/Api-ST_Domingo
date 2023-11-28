import { Router, Request, Response } from 'express';
import { productController } from '../controllers/producto';
import { logMiddleware } from '../middleware/log';
import { checkJwt } from '../middleware/session';

const router = Router();
router.get('/load', productController.getProducts);
router.get('/load/:id', productController.getProduct);
router.post('/create', productController.postProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

export { router };
