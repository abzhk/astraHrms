import bcrypt from "bcryptjs";
import mongoose, { Schema } from "mongoose";

// Define Profile Schema for additional employee details
const profileSchema = new Schema({
  personalInformation: {
    firstName: { type: String },
    lastName: { type: String },
    age: { type: Number },
    bloodgroup: { type: String },
    maritalstatus: { type: String },
    aboutme: { type: String },
    expertise: { type: String },
  },
  workInformation: {
    department: { type: String },
    location: { type: String },
    designation: { type: String },
    role: { type: String },
    employeeType: { type: String },
    employeeStatus: { type: String },
    sourceOfHire: { type: String },
    currentExperience: { type: Number },
    totalExperience: { type: Number },
  },
  contactInformation: {
    workphonenumber: { type: Number },
    extension: { type: Number },
    seatinglocation: { type: String },
    presentaddress: { type: String },
    permanentaddress: { type: String },
    personalmobilenumber: { type: Number },
    personalemailaddress: { type: String },
  },
  bankInformation: {
    bankholdername: { type: String },
    accountnumber:  { type: Number },
    ifsccode: { type: String },
    bankname: { type: String },
  },
  hierarchyInformation: {
    reportingManager: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  identityInformation: {
    uan: { type: Number },
    pan: { type: String },
    aadhar: { type: Number },
  },
  resignationInformation: {
    resignationletterdate: { type: String },
    exitinterviewdate: { type: String },
    relievingdate: { type: String },
    leaveencashed: { type: String },
    newworkplace: { type: String },
    reasonforleaving: { type: String },
    feedback: { type: String },
  },
  imageUrl: { type: String },
});

// Define User Schema with role and reporting manager reference
const userSchema = new Schema(
  {
    name: { type: String, required: true },
    
    title: { type: String, required: true },
    role: {
      type: String,
      enum: ["Admin", "Manager", "Employee"],
      default: "Employee",
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    isManager: { type: Boolean, default: false },
    isEmployee: { type: Boolean, default: true },
    isActive: { type: Boolean, default: true },
    profile: profileSchema,
    reportingManager: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to Reporting Manager
  },
  { timestamps: true }
);

// Pre-save hook to hash password before saving the user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords during login
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Export the User model
const User = mongoose.model("User", userSchema);

export default User;
