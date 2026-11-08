import { z } from "zod";

export const createTaskSchema = z.object({
  body: z.object({
    title: z.string().min(2, "Task title must be at least 2 characters"),
    description: z.string().min(5, "Description must be at least 5 characters"),
    date: z.string().min(5, "Must be a valid date."),
  }),
});

export const updateTaskSchema = z.object({
  body: createTaskSchema.shape.body.partial(),

  params: z.object({
    id: z.string().uuid("Invalid task ID format"),
  }),
});
