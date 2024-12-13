import Student from "../models/demoModel.js";
import { handleError } from "../middlewares/errorMiddlewaves.js";

export const createStudent = async (req, res) => {
  try {
    const { name, age, joineddate, classno, standard, address } = req.body;

    const student = await Student.create({
      name,
      age,
      joineddate,
      classno,
      standard,
      address,
    });

    res.status(201).json({
      status: true,
      message: "student data created successfully",
      student,
    });
  } catch (error) {
    handleError(error, res);
  }
};


export const fetchStudents = async (req, res) => {
  try {
    const students = await Student.find();  

    res.status(200).json({
      status: true,
      students,
    });
  } catch (error) {
    handleError(error, res);
  }
};
