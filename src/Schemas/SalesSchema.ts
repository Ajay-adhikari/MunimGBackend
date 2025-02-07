import { z } from 'zod';

export const SalesSchema = z.object({
    id: z.number(),
    shopId: z.number().int(),
    productId: z.number(),
    quantity: z.number().int().positive("Quantity must be greater than 0"),
    amount: z.number().positive("Total amount must be positive"),
    createdAt: z.string().datetime(),
    profit: z.number().positive("Profit must be positive"),
});


export type SalesType = z.infer<typeof SalesSchema>;

export const addSalesSchema = z.object({
    shopId: SalesSchema.shape.shopId,
    items: z.array(
        z.object({
            id: SalesSchema.shape.productId,
            quantity: SalesSchema.shape.quantity,
            price: SalesSchema.shape.amount,
            profit: SalesSchema.shape.profit,
        })
    ).min(1) // Ensure at least one item is present
});
