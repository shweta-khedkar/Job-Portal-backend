import express from "express";
import {
  deleteJob,
  getAllJobs,
  getMyJobs,
  jobUpdate,
  postJob,
} from "../Controllers/JobController.js";
import { isAutherized } from "../Middlewares/AuthMiddleware.js";

const router = express.Router();
//GET ALL Jobs Router
router.get("/getJobs", getAllJobs);

//Post Job Router
router.post("/postJob", isAutherized, postJob);

//GetMyJobs Only Route
router.get("/getMyJobs", isAutherized, getMyJobs);

//Update Job Route Put method
router.put("/updateJob/:id", isAutherized, jobUpdate);

//Delete Job Route
router.delete("/deleteJob/:id", isAutherized, deleteJob);
export default router;
