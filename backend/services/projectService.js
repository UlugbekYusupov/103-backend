const { users } = require("../config/database");
const { v4: uuidv4 } = require("uuid");

exports.createProject = (
  title,
  description,
  status,
  deadline,
  ownerId,
  members = []
) => {
  const project = {
    id: uuidv4(),
    title,
    description,
    status,
    deadline,
    ownerId,
    members,
    creared_at: Date(),
    updated_at: Date(),
  };
  const user = users.find((user) => user.id === ownerId);
  user.ownedProjects.push(project);

  return project;
};

exports.deleteProjectById = (id, ownerId) => {
  const user = users.find((user) => user.id === ownerId);
  const projectIndex = user.ownedProjects.findIndex(
    (project) => project.id === id
  );
  if (projectIndex === -1) {
    return null;
  }
  user.ownedProjects.splice(projectIndex, 1);
  return true;
};

exports.getProjectById = (id, ownerId) => {
  const user = users.find((user) => user.id === ownerId);
  const projectIndex = user.ownedProjects.findIndex(
    (project) => project.id === id
  );
  if (projectIndex === -1) {
    return null;
  }
  return user.ownedProjects[projectIndex];
};

exports.getProjects = (ownerId) => {
  const user = users.find((user) => user.id === ownerId);
  return user.ownedProjects;
};

exports.addMemberToProject = (projectId, memberId, ownerId) => {
  const user = users.find((user) => user.id === ownerId);
  if (!user) {
    throw new Error("Owner not found");
    return;
  }
  const project = user.ownedProjects.find(
    (project) => project.id === projectId
  );
  if (!project) {
    throw new Error("Project not found");
    return;
  }
  const member = users.find((user) => user.id === memberId);
  if (!member) {
    throw new Error("Member not found");
    return;
  }
  member.participatedProjects.push(project);
  project.members.push({ id: memberId });
  return true;
};
