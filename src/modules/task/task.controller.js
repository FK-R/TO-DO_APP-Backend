import taskService from "./task.service.js";

class TaskController {
  async create(req, res) {
    try {
      const { title, description, date } = req.body;

      if (!title) {
        return res.status(400).json({ error: "Title is a required field." });
      }

      const task = await taskService.createTask({ title, description, date });
      return res.status(201).json({
        success: true,
        statusCode: 201,
        message: "Task created successfully",
        data: task,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Internal Server Error", details: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const tasks = await taskService.getAllTask();
      console.log("aaaaaaaaaaaaa", tasks);
      return res.status(200).json({
        success: true,
        statusCode: 200,
        count: tasks.length,
        data: tasks,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Internal Server Error", details: error.message });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const task = await taskService.getTaskById(id);

      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }

      return res.status(200).json({
        success: true,
        statusCode: 200,
        data: task,
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
      const existing = await taskService.getTaskById(id);

      if (!existing) {
        return res.status(404).json({ error: "Task not found" }); // Fixed from "Product not found"
      }

      const taskUp = await taskService.updateTask(id, req.body);
      console.log(taskUp);
      return res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Task updated successfully",
        data: taskUp,
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
      const existing = await taskService.getTaskById(id);

      if (!existing) {
        return res.status(404).json({ error: "Task not found" }); // Fixed from "Product not found"
      }

      await taskService.deleteTask(id);
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

export default new TaskController();
