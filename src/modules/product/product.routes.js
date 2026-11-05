const express = require("express");
const router = express.Router();
const productController = require("./product.controller");
const validate = require("../../middlewares/validate.middleware");
const {
  createProductSchema,
  createUpdateSchema,
} = require("../product/product.validator");

router.post(
  "/add-product",
  validate(createProductSchema),
  productController.create,
);
router.get("/get-product/:id", productController.findUnique);
router.get("/get-products", productController.findMany);
router.put("/update-product/:id", productController.update);
router.delete("/delete-product/:id", productController.delete);

module.exports = router;
