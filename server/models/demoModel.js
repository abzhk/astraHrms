import mongoose from "mongoose";

const demoSchema = new mongoose.Schema({
  name: { type: String},
  age: { type: Number },
  joineddate: { type: Date, default: Date.now },
  classno: { type: Number },
  standard: { type: Number },
  address: { type: String },
});

const student = mongoose.model("demo", demoSchema);
export default student;
