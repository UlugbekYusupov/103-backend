const express = require("express");
const router = express.Router();

const projectController = require("../controllers/projectController");

router.post("/", projectController.create);
router.get("/", projectController.getAllProjects);
// router.post("/update/:id", projectController.updateProject);
router.get("/:id", projectController.getProject);
router.delete("/:id", projectController.deleteProject);
router.post("/:projectId/:memberId", projectController.addMember);

module.exports = router;
