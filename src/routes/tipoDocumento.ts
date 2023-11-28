import { Router } from "express";
import { tipoDocumentoController } from "../controllers/tipo_documento";

const router = Router();

router.get('/load', tipoDocumentoController.GetTipoDocumento);

export { router };