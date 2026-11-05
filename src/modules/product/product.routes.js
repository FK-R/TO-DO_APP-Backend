import { Router } from "express";
import productController from "./product.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import {
  createProductSchema,
  updateProductSchema,
} from "./product.validator.js";

const router = Router();

router.post(
  "/add-product",
  validate(createProductSchema),
  productController.create,
);
router.get("/get-product/:id", productController.findUnique);
router.get("/get-products", productController.findMany);
router.put(
  "/update-product/:id",
  validate(updateProductSchema),
  productController.update,
);
router.delete("/delete-product/:id", productController.delete);

export default router;
