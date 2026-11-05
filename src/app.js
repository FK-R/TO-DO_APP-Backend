import express from "express";
import taskRoutes from "./modules/task/task.routes.js";
import productRoutes from "./modules/product/product.routes.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/todos", taskRoutes);
app.use("/products", productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
