import express from 'express';
import controller from '../controllers/Denuncia';
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';

const router = express.Router();

router.post('/', ValidateSchema(Schemas.denuncia.create), controller.createDenuncia);
router.get('/:denunciaId', controller.readDenuncia);
router.get('/', controller.readAll);
router.put('/:denunciaId', ValidateSchema(Schemas.denuncia.update), controller.updateDenuncia);
router.delete('/:denunciaId', controller.deleteDenuncia);

export = router;
