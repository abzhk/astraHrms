import express from 'express'
import { createAssignment } from '../controllers/assignmentController.js';
import { protectRoute } from '../middlewares/authMiddlewave.js';
import { getAssignmentsForDeveloper } from '../controllers/assignmentController.js';


const router = express.Router();

router.post ('/create', protectRoute,createAssignment);
router.get ('/developer/:developerId', protectRoute,getAssignmentsForDeveloper);
// router.get ('/developer/:developerId', protectRoute,getAssignmentsByDevelopers);

export default router;