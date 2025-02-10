import { z } from 'zod';

export const ExpenseSchema = z.object({
    id: z.number(),
    shopId: z.number(),
    amount: z.number().positive("Amount must be positive"),
    description: z.string().min(4, "Description is required"),
    category: z.string().min(4, "Category is required"),
    paymentMode: z.string(),
    paidTo: z.string(),
    createdAt: z.string().datetime()
});

export type ExpenseType = z.infer<typeof ExpenseSchema>;

export const AddExpenseSchema = z.object({
    shopId: ExpenseSchema.shape.shopId,
    amount: ExpenseSchema.shape.amount,
    description: ExpenseSchema.shape.description,
    category: ExpenseSchema.shape.category,
    paymentMode: ExpenseSchema.shape.paymentMode,
    paidTo: ExpenseSchema.shape.paidTo,
});
