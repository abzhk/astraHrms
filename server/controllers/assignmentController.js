import Task from '../models/assignmentModel.js'
import { handleError } from '../middlewares/errorMiddlewaves.js'; 


export const createAssignment = async (req, res,next) => {
  try {
    const { title, priority, duration, description, developerId, managerId } = req.body;

    const assignedDeveloper = Array.isArray(developerId) ? developerId : developerId.split(',');

   
    const newAssignment = new Task({
      title,
      priority,
      duration,
      description,
      assignedDeveloper,
      managerId,
    });

  
    await newAssignment.save();

    res.status(201).json({ message: 'Assignment created successfully', assignment: newAssignment });
  } catch (error) {
    console.error('Error creating assignment:', error);  
    next(error)
    // handleError(res,next, error, "Error creating assignment");
  }
};

// Get all assignments
// export const getAllAssignments = async (req, res) => {
//   try {
//     const assignments = await Task.find().populate('assignedDeveloper managerId');
//     res.status(200).json(assignments);
//   } catch (error) {
//     handleError(res, error, "Error fetching assignments");
//   }
// };

// // Get assignment by ID
// export const getAssignmentById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const assignment = await Task.findById(id).populate('assignedDeveloper managerId');

//     if (!assignment) {
//       return res.status(404).json({ message: 'Assignment not found' });
//     }

//     res.status(200).json(assignment);
//   } catch (error) {
//     handleError(res, error, "Error fetching assignment");
//   }
// };

// // Update assignment
// export const updateAssignment = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, priority, duration, description, assignedDeveloper, managerId } = req.body;

//     const updatedAssignment = await Task.findByIdAndUpdate(
//       id,
//       { title, priority, duration, description, assignedDeveloper, managerId },
//       { new: true }
//     ).populate('assignedDeveloper managerId');

//     if (!updatedAssignment) {
//       return res.status(404).json({ message: 'Assignment not found' });
//     }

//     res.status(200).json({ message: 'Assignment updated successfully', assignment: updatedAssignment });
//   } catch (error) {
//     handleError(res, error, "Error updating assignment");
//   }
// };

// // Delete assignment
// export const deleteAssignment = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const deletedAssignment = await Task.findByIdAndDelete(id);

//     if (!deletedAssignment) {
//       return res.status(404).json({ message: 'Assignment not found' });
//     }

//     res.status(200).json({ message: 'Assignment deleted successfully' });
//   } catch (error) {
//     handleError(res, error, "Error deleting assignment");
//   }
// };

// export const getAssignmentsByDevelopers = async (req, res) => {
//   try {
//     // Extract developer IDs from query parameters (e.g., ?developers=id1,id2,id3)
//     const developerIds = req.query.developers.split(',');

//     // Find assignments where the 'assignedDeveloper' contains any of the IDs in the array
//     const assignments = await Task.find({ assignedDeveloper: { $in: developerIds } }).populate('assignedDeveloper managerId');

//     if (!assignments || assignments.length === 0) {
//       return res.status(404).json({ message: 'No assignments found for these developers' });
//     }

//     res.status(200).json(assignments);
//   } catch (error) {
//     handleError(res, error, "Error fetching assignments for developers");
//   }
// };

export const getAssignmentsForDeveloper = async (req, res, next) => {
  try {
    // Get developer ID from request parameters
    const { developerId } = req.params;

    // Ensure the developerId is valid and properly formatted
    if (!developerId) {
      return res.status(400).json({ message: 'Developer ID is required.' });
    }

    // Find assignments where the developerId exists in the assignedDeveloper array
    const assignments = await Task.find({
      assignedDeveloper: { $in: [developerId] }, // Use $in operator for array matching
    }).populate('managerId', 'name email'); // Adjust fields as needed

    // If no assignments are found
    if (assignments.length === 0) {
      return res.status(404).json({ message: 'No assignments found for this developer.' });
    }

    res.status(200).json({ message: 'Assignments fetched successfully', assignments });
  } catch (error) {
    console.error('Error fetching assignments:', error);
    next(error); // Pass error to error handling middleware
  }
};
