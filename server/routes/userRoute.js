import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  getEmployeeList,
  updateUserProfile,
  profileinfo,
  getProfileInfo,
  // getManager,
  // getManagerById,
  // getDeveloper,

} from "../controllers/userController.js";



import { protectRoute, isAdminRoute } from "../middlewares/authMiddlewave.js";

const router = express.Router();

// Auth routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);


router.get("/get-employee", protectRoute, isAdminRoute, getEmployeeList);


//profile 
router.put("/profile", protectRoute, updateUserProfile);
router.put("/data", protectRoute, profileinfo);
router.get("/getdata", protectRoute, getProfileInfo);

// router.get("/managerlist",protectRoute,getManager);

// router.get('/managers/:id', getManagerById);
// router.get('/developerlist',protectRoute,getDeveloper);



export default router;
