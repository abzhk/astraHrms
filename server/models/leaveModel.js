import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Add userId field
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  leaveType: { type: String, required: true },
  approver: { type: String, required: true },
  reason: { type: String, required: true },
});

const Leave = mongoose.model("Leave", leaveSchema);
export default Leave;
