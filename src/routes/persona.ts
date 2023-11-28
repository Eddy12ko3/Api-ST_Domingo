import { Router } from 'express';
import { personController } from '../controllers/persona';
import { checkJwt } from '../middleware/session';

const router = Router();

router.get('/load', checkJwt, personController.GetPersons);

export { router };
