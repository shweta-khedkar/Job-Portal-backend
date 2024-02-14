import mongoose from "mongoose";
import validator from "validator";

const applicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Provide Your Name"],
  },
  email: {
    type: String,
    required: [true, "Please Provide Your Email"],
    validate: [validator.isEmail, "Please Provide Valid Email Id"],
  },
  coverLetter: {
    type: String,
    required: [true, "Please Provide Your Cover Letter"],
  },
  phone: {
    type: Number,
    required: [true, "Provide Your Mobile Number"],
  },
  address: {
    type: String,
  },
  resume: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  applicantID: {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: ["Job Seeker"],
      required: true,
    },
  },
  employerID: {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: ["Job Poster"],
      required: true,
    },
  },
});

export const Application = mongoose.model("Application", applicationSchema);
