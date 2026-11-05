import { z } from "zod";

export const createProductSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: "Product name is required" })
      .min(2, "Name must be at least 2 characters"),
    description: z
      .string({ required_error: "Description is required" })
      .min(5, "Name must be at least 5 characters"),
    price: z
      .number({ required_error: "Price is required" })
      .positive("Price must be greater than zero"),
  }),
});

export const updateProductSchema = z.object({
  body: createProductSchema.shape.body.partial(),
  params: z.object({
    id: z.string().uuid("Invalid product ID format"),
  }),
});
