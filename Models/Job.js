import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    company_Name: {
      type: String,
      required: true,
    },
    logo_Url: {
      type: String,
    },
    position: {
      type: String,
      required: true,
      index: true,
    },
    monthly_Salary: {
      type: Number,
    },
    duration: {
      type: Number,
    },
    job_Type: {
      type: String,
      enum: ["Full time", "Part time", "Contract", "Internship"],
      required: true,
    },
    remote_Office: {
      type: String,
      enum: ["Remote", "Office", "Hybrid"],
      required: true,
    },
    location: {
      type: String,
    },
    job_Description: {
      type: String,
      required: true,
    },
    about_Company: {
      type: String,
    },
    skills: {
      type: [
        {
          type: String,
          lowercase: true,
        },
      ],
      index: true,
      default: [],
    },
    Add_Information: {
      type: String,
    },
    recruiter: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    expired: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Job = mongoose.model("Job", jobSchema);
