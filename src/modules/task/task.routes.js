const express = require("express");
const taskController = require("./task.controller");
const router = express.Router();

router.post("/", taskController.create);
router.get("/", taskController.getAll);
router.get("/:id", taskController.getById);
router.put("/:id", taskController.update);
router.delete("/:id", taskController.delete);

module.exports = router;
