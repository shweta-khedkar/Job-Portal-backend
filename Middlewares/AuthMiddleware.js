import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./errorMiddleware.js";
import JWT from "jsonwebtoken";
import { User } from "../Models/User.js";
export const isAutherized = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("User Not Authorized", 400));
  }
  const decode = JWT.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decode.id);
  next();
});
