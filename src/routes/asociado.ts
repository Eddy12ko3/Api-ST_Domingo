import { Router, Request, Response } from 'express';
import { logMiddleware } from '../middleware/log';
import { checkJwt } from '../middleware/session';
import { associateController } from '../controllers/asociado';

const router = Router();
router.get('/load', checkJwt, associateController.getAssociates);
router.get('/load/:id', checkJwt, associateController.getAssociate);
router.post('/create', checkJwt, associateController.postAssociates);
router.put('/update/:id', checkJwt, associateController.updateAssociates);
router.delete('/delete/:id', checkJwt, associateController.deleteAssociates);

export { router };
