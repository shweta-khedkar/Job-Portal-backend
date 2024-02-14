import { catchAsyncErrors } from "../Middlewares/catchAsyncErrors.js";
import ErrorHandler from "../Middlewares/errorMiddleware.js";
import { Job } from "../Models/Job.js";

//Get All Jobs API
export const getAllJobs = catchAsyncErrors(async (req, res, next) => {
  const jobs = await Job.find({ expired: false });
  res.status(200).json({
    success: true,
    jobs,
  });
});

//Create Job API

export const postJob = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(new ErrorHandler("Job Seeker is Not Allowed to Post Job"), 400);
  }

  const {
    company_Name,
    logo_Url,
    position,
    monthly_Salary,
    duration,
    job_Type,
    remote_Office,
    location,
    job_Description,
    about_Company,
    skills,
    Add_Information,
  } = req.body;

  if (
    !company_Name ||
    !position ||
    !job_Type ||
    !remote_Office ||
    !job_Description
  ) {
    return next(new ErrorHandler("Please provide All Job Fields", 400));
  }
  const recruiter = req.user._id;
  const job = await Job.create({
    company_Name,
    logo_Url,
    position,
    monthly_Salary,
    duration,
    job_Type,
    remote_Office,
    location,
    job_Description,
    about_Company,
    skills,
    Add_Information,
    recruiter,
  });

  res.status(200).json({
    success: true,
    message: "Job Created Successfully",
    job,
  });
});

//Only My Jobs API

export const getMyJobs = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler("Job Seeker is Not Allowed to Access Poster Jobs"),
      400
    );
  }
  const myJobs = await Job.find({
    recruiter: req.user._id,
  });

  res.status(200).json({
    success: true,
    myJobs,
  });
});

//Update Job API

export const jobUpdate = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler("Job Seeker is Not Allowed to Access Poster Jobs", 400)
    );
  }

  const { id } = req.params;
  let job = await Job.findById(id);
  if (!job) {
    return next(new ErrorHandler("Job Not Found To Update", 404));
  }
  job = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    job,
    message: "Job Updated Successfully",
  });
});

//Delete Job API

export const deleteJob = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
    );
  }
  const { id } = req.params;
  const job = await Job.findById(id);
  if (!job) {
    return next(new ErrorHandler("OOPS! Job not found.", 404));
  }
  await job.deleteOne();
  res.status(200).json({
    success: true,
    message: "Job Deleted!",
  });
});
