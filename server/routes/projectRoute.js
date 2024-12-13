// routes/projectRoutes.js
import express from "express";
import {
  createProject,
  getAllProjects,
  getProjectsByManagerId,

  //deleteProject,
  
} from "../controllers/projectController.js";
import { protectRoute } from "../middlewares/authMiddlewave.js"; // Assuming you have authentication middleware

// import { useGetProjectsByManagerIdQuery } from "../../client/src/redux/slices/api/projectApiSlice.js";

const router = express.Router();

router.post("/create", protectRoute, createProject); // Create a project
// router.put("/:id", protectRoute, updateProject); // Update a project
 router.get("/get", protectRoute, getAllProjects); // Get list of projects

//get project by manager id
 router.get("/passone/:id",protectRoute,getProjectsByManagerId);


//router.delete("/:id", protectRoute, deleteProject); // Delete a project

export default router;
