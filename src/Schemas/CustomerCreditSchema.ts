import { stat } from 'fs';
import { z } from 'zod';

export const CustomerCreditSchema = z.object({
    id: z.number(),
    shopId: z.number(),
    name: z.string().min(3).max(50),
    phone: z.string().regex(/^\d{10}$/, "Enter valid Phone Number"),
    productId: z.number(),
    quantity: z.number(),
    totalAmount: z.number(),
    creditDate: z.string().datetime(),
    status: z.enum(['pending', 'paid']),
});

export type CustomerCreditType = z.infer<typeof CustomerCreditSchema>;