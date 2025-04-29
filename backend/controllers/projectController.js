const { projects } = require("../config/database");
const projectService = require("../services/projectService");

exports.create = (req, res) => {
  const { title, description, members, deadline, status, ownerId } = req.body;
  try {
    const project = projectService.createProject(
      title,
      description,
      status,
      deadline,
      ownerId,
      members
    );
    return res.status(201).json({ project, message: "Project created!" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.deleteProject = (req, res) => {
  const { id } = req.params;
  const { ownerId } = req.body;

  try {
    const project = projectService.deleteProjectById(id, ownerId);
    if (project) {
      return res.status(200).json({ message: "Project remover successfully" });
    }
    return res.status(404).json({ message: "Project not found" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getProject = (req, res) => {
  const { id } = req.params;
  const { ownerId } = req.body;
  try {
    const project = projectService.getProjectById(id, ownerId);
    if (project != null) {
      return res.status(200).json({ project });
    }
    return res.status(404).json({ message: "Project not found" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getAllProjects = (req, res) => {
  const { ownerId } = req.body;
  try {
    const projects = projectService.getProjects(ownerId);
    return res.status(200).json(projects);
  } catch (err) {
    return res.status(500).json({ error: error.message });
  }
};

exports.addMember = (req, res) => {
  const { projectId, memberId } = req.params;
  const { ownerId } = req.body;
  try {
    const isAdded = projectService.addMemberToProject(
      projectId,
      memberId,
      ownerId
    );
    if (isAdded) {
      return res.status(200).json({ message: "Member added successfully!" });
    }
    return res.status(404).json({ message: "Project or User not found" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
