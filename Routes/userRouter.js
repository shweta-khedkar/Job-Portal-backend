import express from "express";
import {
  getUser,
  login,
  logout,
  register,
} from "../Controllers/UserController.js";
import { isAutherized } from "../Middlewares/AuthMiddleware.js";
const router = express.Router();

//register user router

router.post("/register", register);

//login User Router
router.post("/login", login);

//logout User Router

router.get("/logout", isAutherized, logout);

//Get User Router
router.get("/getUser", isAutherized, getUser);

export default router;
