import mongoose from "mongoose";

export const dbConnect = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "JOB_PORTAL_MERN",
    })
    .then(() => {
      console.log("Connected to MongoDB Database");
    })
    .catch((err) => {
      console.log(`Some error found ${err}`);
    });
};
