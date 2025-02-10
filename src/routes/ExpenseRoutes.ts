import express from 'express'
import { validate, validateSchema } from '../middleware/Validation';
import Expense from '../controllers/ExpenseController';
import { AddExpenseSchema } from '../Schemas/ExpenseSchema';

const router = express.Router();

router.post('/add', validate, validateSchema(AddExpenseSchema), Expense.add);
router.get('/list', validate, Expense.list);

export default router;