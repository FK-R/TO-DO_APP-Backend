const productService = require("./product.service");

class ProductController {
  async create(req, res) {
    try {
      const { name, description, price } = req.body;
      if (!name) {
        return res.status(400).json({ error: "Name can not be empty" });
      }
      const product = await productService.createProduct({
        name,
        description,
        price,
      });

      return res.status(201).json({
        success: true,
        message: "Product Created Successfully",
        data: product,
        statusCode: 201,
      });
    } catch (error) {
      return res.status(500).json({
        error: "Internal server error",
        details: error.message,
      });
    }
  }

  async findMany(req, res) {
    try {
      const products = await productService.getAllProducts();
      console.log(products);
      return res.status(200).json({
        success: true,
        statusCode: 200,
        count: products.length,
        data: products,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Internal Server Error", details: error.message });
    }
  }

  async findUnique(req, res) {
    try {
      const { id } = req.params;
      const product = await productService.getProductById(id);
      if (!product) {
        return res.status(400).json({ error: "Product not found" });
      }

      console.log(product);
      return res.status(200).json({
        success: true,
        statusCode: 200,
        data: product,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Internal Server Error", details: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const existProduct = await productService.getProductById(id);
      if (!existProduct) {
        return res.status(400).json({ error: "Product not found" });
      }

      const productUp = await productService.updateProduct(id, req.body);
      return res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Task updated successfully",
        data: productUp,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Internal Server Error", details: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const existProduct = await productService.getProductById(id);
      if (!existProduct) {
        return res.status(400).json({ error: "Product not found" });
      }

      await productService.removeProduct(id);
      return res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Task deleted successfully",
      });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Internal Server Error", details: error.message });
    }
  }
}
module.exports = new ProductController();
