import prisma from "../../config/prisma.js";

class ProductService {
  async createProduct(data) {
    return await prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
      },
    });
  }

  async getAllProducts() {
    return await prisma.product.findMany({
      orderBy: { id: "asc" },
    });
  }

  async getProductById(id) {
    return await prisma.product.findUnique({
      where: { id },
    });
  }

  async updateProduct(id, data) {
    return await prisma.product.update({
      where: { id },
      data,
    });
  }

  async removeProduct(id) {
    return await prisma.product.delete({
      where: { id },
    });
  }
}

export default new ProductService();
