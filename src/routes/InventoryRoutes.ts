import express from 'express';
import { validate, validateSchema } from '../middleware/Validation';
import { AddInventorySchema } from '../Schemas/InventorySchema';
import Inventory from '../controllers/InventoryController';

const router = express.Router();
router.post('/add', validate, validateSchema(AddInventorySchema), Inventory.add);
router.get('/list', validate, Inventory.list);
router.delete('/delete', validate, Inventory.delete);
router.put('/edit', validate, validateSchema(AddInventorySchema), Inventory.edit);

export default router;