import { Router } from "express";
import taskController from "./task.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { createTaskSchema, updateTaskSchema } from "./task.validator.js";
const router = Router();

router.post("/", validate(createTaskSchema), taskController.create);
router.get("/", taskController.getAll);
router.get("/:id", taskController.getById);
router.put("/:id", validate(updateTaskSchema), taskController.update);
router.delete("/:id", taskController.delete);

export default router;
