import { z } from 'zod';

const ExpenseSchema = z.object({
    id: z.number(),
    shop_id: z.number(),
    amount: z.number().positive("Amount must be positive"),
    description: z.string().min(4, "Description is required"),
    expense_date: z.string().datetime()
});

type Expenses = z.infer<typeof ExpenseSchema>;
