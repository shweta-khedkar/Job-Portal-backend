import express from "express";
import { isAutherized } from "../Middlewares/AuthMiddleware.js";
import {
  employerGetAllApplications,
  jobseekerDeleteApplication,
  jobseekerGetAllApplications,
  postApplication,
} from "../Controllers/ApplicationController.js";

const router = express.Router();

router.get("/employer/getAll", isAutherized, employerGetAllApplications);
router.get("/jobseeker/getAll", isAutherized, jobseekerGetAllApplications);
router.delete(
  "/deleteApplication/:id",
  isAutherized,
  jobseekerDeleteApplication
);
//Application Post Route
router.post("/jobSeeker/postApplication", isAutherized, postApplication);
export default router;
