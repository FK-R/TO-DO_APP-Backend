import { ZodError } from "zod";

export const validate = (schema) => async (req, res, next) => {
  try {
    const parsedData = await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    if (parsedData.body !== undefined) {
      req.body = parsedData.body;
    }

    return next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        status: "error",
        message: "Validation failed",
        errors: error.issues.map((issue) => ({
          field: issue.path.join(".") || "unknown",
          message: issue.message,
        })),
      });
    }

    return next(error);
  }
};
