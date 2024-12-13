import express from 'express'
import { createStudent } from '../controllers/demoController.js';
import { fetchStudents} from '../controllers/demoController.js'
import{protectRoute} from '../middlewares/authMiddlewave.js'



const router = express.Router();

router.post ('/create', protectRoute, createStudent);
router.get('/Students',protectRoute,fetchStudents);

export default router;