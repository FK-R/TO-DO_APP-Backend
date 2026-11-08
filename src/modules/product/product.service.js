import prisma from "../../config/prisma.js";

const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "products" },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      },
    );
    stream.end(fileBuffer);
  });
};

class ProductService {
  async createProduct(data, file) {
    let imageUrl = null;
    let publicId = null;

    if (file) {
      const uploadRes = await uploadToCloudinary(file.buffer);
      imageUrl = uploadRes.secure_url;
      publicId = uploadRes.public_id;
    }
    return await prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: parseFloat(data.price),
        imageUrl,
        publicId,
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
