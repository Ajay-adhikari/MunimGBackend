import { z } from 'zod';

const InventorySchema = z.object({
    id: z.number(),
    shopId: z.number(),
    name: z.string().min(2, "Product name is required"),
    sellingPrice: z.number().gt(0, "Must be greater than 0").positive("Price must be a positive number"),
    quantity: z.number().gt(0, "Must be greater than 0").positive("Quantity must be a positive number"),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    margin: z.number().gt(0, "Must be greater than 0").positive("Margin must be a positive number"),
    costPrice: z.number().gt(0, "Must be greater than 0").positive("Cost price must be a positive number"),
});

export type InventoryType = z.infer<typeof InventorySchema>;

export const AddInventorySchema = z.object({
    shopId: InventorySchema.shape.shopId,
    name: InventorySchema.shape.name,
    sellingPrice: InventorySchema.shape.sellingPrice,
    quantity: InventorySchema.shape.quantity,
    margin: InventorySchema.shape.margin,
    costPrice: InventorySchema.shape.costPrice,
})
