import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

//Creating Schema for User

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Provide Your Name !"],
  },
  email: {
    type: String,
    required: [true, "Please Provide Your Email"],
    validate: [validator.isEmail, "Please Provide Valid Email !"],
  },
  phone: {
    type: Number,
    required: [true, "Please Provide Your Phone Number !"],
  },
  password: {
    type: String,
    required: [true, "Please Provide Your Password !"],
    minLength: [6, "Provide Password Greater Than 6 Characters"],
    select: false,
  },
  role: {
    type: String,
    required: [true, "Please Select Your Role "],
    enum: ["Job Seeker", "Job Poster"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//Encryption Is here Hashing Password

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//Comparing Password

userSchema.methods.comparePassword = async function (enteredpass) {
  return await bcrypt.compare(enteredpass, this.password);
};

//jwt generation for Autherization

userSchema.methods.getJWT = function () {
  return JWT.sign(
    {
      id: this._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );
};

export const User = mongoose.model("User", userSchema);
