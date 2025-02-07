import express from 'express';
import { validate, validateSchema } from '../middleware/Validation';
import SalesController from '../controllers/SalesController';
import { addSalesSchema } from '../Schemas/SalesSchema';

const router = express.Router();

router.post('/add', validate, validateSchema(addSalesSchema), SalesController.add);

export default router;