import Project from "../models/projectModel.js"; // Assuming you have a projectModel defined


import { handleError } from "../middlewares/errorMiddlewaves.js"

// Create a new project
export const createProject = async (req, res) => {
  try {
    const {
      title,
      managerId,
      priorityLevel,
      duration, // in days, weeks, etc.
      description,
    } = req.body;
    const createdBy = req.user.userId; // Assuming req.user contains logged in user info
    const createdDate = new Date(); // Current date

    const project = await Project.create({
      title,
      createdBy,
      createdDate,
      managerId,
      priorityLevel,
      duration,
      description,
    });
// const savedproject=await project.save()
    res.status(201).json({
      status: true,
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    handleError(error, res);
  }
};

// Update an existing project
export const updateProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const {
      title,
      managerId,
      priorityLevel,
      duration,
      description,
    } = req.body;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ status: false, message: "Project not found" });
    }

    project.title = title || project.title;
    project.managerId = managerId || project.managerId;
    project.priorityLevel = priorityLevel || project.priorityLevel;
    project.duration = duration || project.duration;
    project.description = description || project.description;

    const updatedProject = await project.save();

    res.status(200).json({
      status: true,
      message: "Project updated successfully",
      project: updatedProject,
    });
  } catch (error) {
    handleError(error, res);
  }
};

// Get project details by Manager ID
export const getProjectsByManagerId = async (req, res) => {
  try {
    const { id } = req.params; // Get the manager's ID from request parameters
    
    // Find projects with the specified managerId
    const projects = await Project.find({ managerId: id }) 
      .populate("createdBy", "name email") // Fetch details of the creator
      .populate("managerId", "name email"); // Fetch details of the manager

    if (projects.length === 0) {
      return res.status(404).json({ status: false, message: "No projects found for this manager" });
    }

    res.status(200).json({
      status: true,
      message: "Projects fetched successfully",
      projects,
    });
  } catch (error) {
    handleError(error, res);
  }
};


// Get all projects
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("createdBy", "name email") // Fetch details of the creator
      .populate("managerId", "name email"); // Fetch details of the manager

    res.status(200).json({
      status: true,
      message: "Projects fetched successfully",
      projects,
    });
  } catch (error) {
    handleError(error, res);
  }
};

// Delete a project
export const deleteProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    await Project.findByIdAndDelete(projectId);

    res.status(200).json({ status: true, message: "Project deleted successfully" });
  } catch (error) {
    handleError(error, res);
  }
};
