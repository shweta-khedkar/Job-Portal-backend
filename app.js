import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import userRouter from "./Routes/userRouter.js";
import jobRouter from "./Routes/jobRouter.js";
import applicationRouter from "./Routes/applicationRouter.js";
import { dbConnect } from "./Database/dbConnect.js";
import { errorMiddleware } from "./Middlewares/errorMiddleware.js";
const app = express();
dotenv.config({ path: "./Config/config.env" });

//Use Middleware
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/temp",
  })
);

app.use("/api/v1/user", userRouter);
app.use("/api/v1/application", applicationRouter);
app.use("/api/v1/job", jobRouter);

dbConnect();

//last error Middleware

app.use(errorMiddleware);
export default app;
