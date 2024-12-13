import mongoose from "mongoose";

const assignmentschema = new mongoose.Schema({
    title: {
        type: String,},
      priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],},
      duration: {
        type: Number,  min: 1,max: 52,},
      description: {
        type: String,trim: true, },
      assignedDeveloper: 
        [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
      managerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  required: true,},
    }, { timestamps: true });

    const task =mongoose.model ('assignment',assignmentschema);

export default task;