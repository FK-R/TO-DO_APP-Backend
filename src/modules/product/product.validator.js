import { z } from "zod";

export const createProductSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Product name must be at least 2 characters"),
    description: z.string().min(5, "Description must be at least 5 characters"),
    price: z.coerce.number().positive("Price must be greater than zero"),
  }),
});

export const updateProductSchema = z.object({
  body: createProductSchema.shape.body.partial(),

  params: z.object({
    id: z.string().uuid("Invalid product ID format"),
  }),
});
