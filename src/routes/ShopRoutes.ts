import { Router } from 'express';
import { validateSchema, validate } from '../middleware/Validation';
import { AddShopSchema } from '../Schemas/ShopSchema';
import Shops from '../controllers/ShopsController';

const router = Router();

router.post('/add', validate, validateSchema(AddShopSchema), Shops.add);
router.get('/list', validate, Shops.list);
router.post('/remove', validate, Shops.remove);

export default router;