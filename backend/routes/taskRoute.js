const express = require("express");
const router = express.Router();

const taskController = require("../controllers/taskController");

// Create a task within the project by project id
router.post("/", taskController.create);

// get all tasks of the project by project id
router.get("/", taskController.getAllTasks);

// get single task of the project by project id
router.get("/:id", taskController.getTask);

// delete single task of the project by project id
router.delete("/:id", taskController.deleteTask);

// assign a task to a member by member id and  project id
router.post("/:projectId/:memberId", taskController.assignTask);

// update task by task id and project id
router.post("/update/:id", taskController.updateTask);

module.exports = router;
