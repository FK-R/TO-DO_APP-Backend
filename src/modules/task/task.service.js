const prisma = require("../../config/prisma");

class TaskService {
  async createTask(data) {
    return await prisma.todo.create({
      data: {
        title: data.title,
        description: data.description,
        date: data.date,
      },
    });
  }

  async getAllTask() {
    return await prisma.todo.findMany({
      orderBy: { id: "asc" },
    });
  }

  async getTaskById(id) {
    return await prisma.todo.findUnique({
      where: {
        id: id,
      },
    });
  }

  async updateTask(id, data) {
    return await prisma.todo.update({
      where: { id },
      data,
    });
  }

  async deleteTask(id) {
    return await prisma.todo.delete({
      where: { id },
    });
  }
}

module.exports = new TaskService();
