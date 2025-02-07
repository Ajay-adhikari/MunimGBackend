import { z as zod } from 'zod';

import { z } from 'zod';

const ShopSchema = z.object({
    id: z.number(),
    userId: z.number(),
    name: z.string().min(3, "Name must contain 3 characters"),
    address: z.string().min(10, "Address must contain 10 characters"),
    phone: z.string().regex(/^\d{10}$/, "Enter valid Phone Number"),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    description: z.string().min(10, "Description must contain 10 characters"),
});

export type ShopType = z.infer<typeof ShopSchema>;

export const AddShopSchema = z.object({
    name: ShopSchema.shape.name,
    address: ShopSchema.shape.address,
    phone: ShopSchema.shape.phone,
    description: ShopSchema.shape.description,
})

