import { z } from 'zod';

const SummarySchema = z.object({
    id: z.number(),
    total_sales: z.number().min(0, "Total sales cannot be negative"),
    total_expenses: z.number().min(0, "Total expenses cannot be negative"),
    total_shops: z.number().int().min(0, "Total shops cannot be negative"),
    summary_date: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date format",
    }).optional(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime()
});

type Summary = z.infer<typeof SummarySchema>;
