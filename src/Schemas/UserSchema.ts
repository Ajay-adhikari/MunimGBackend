import { z } from 'zod';

const UserSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "password must contain 8 characters").max(16),
    phone: z.string().regex(/^\d{10}$/, "Enter valid Phone Number"),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime()

});
export type UserType = z.infer<typeof UserSchema>;

export const AddUserScehma = z.object({
    name: UserSchema.shape.name,
    email: UserSchema.shape.email,
    password: UserSchema.shape.password,
    phone: UserSchema.shape.phone
});

export const LoginSchema = z.object({
    email: UserSchema.shape.email,
    password: UserSchema.shape.password
});


