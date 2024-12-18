import express from "express";
import userRoutes from "./userRoute.js"
import projectRoute from "./projectRoute.js"
import studentRoute from "./demoRoute.js"
import assignmentRoute from './assignmentRoute.js'


const router = express.Router();

router.use("/user", userRoutes);
router.use("/project",  projectRoute );
router.use("/demo",  studentRoute );
router.use ('/assign',assignmentRoute);


export default router;
