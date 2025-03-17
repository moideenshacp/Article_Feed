import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/userModel";
import jwt from "jsonwebtoken";
import { signUpSchema, updateProfileSchema } from "../validators/userValidator";

export const signUp = async (req: Request, res: Response) => {
    try {
      const { datas } = req.body;
  
      console.log("heyyyyyyyyii",datas);
      
      // Validate request data
      const { error } = signUpSchema.validate(datas, { abortEarly: false });
      if (error) {
        const errors = error.details.map((err) => err.message);
        return res.status(400).json({ message: "Validation error", errors });
      }
  
      // Check if email already exists
      const existingUser = await User.findOne({ email: datas.email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already registered." });
      }
  
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(datas.password, salt);
  
      // Create new user
      const newUser = new User({
        email: datas.email,
        firstName: datas.firstName,
        lastName: datas.lastName,
        phone: datas.phone,
        dob: datas.dob,
        password: hashedPassword,
        preferences: datas.preferences || [],
      });
  
      await newUser.save();
      res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
      console.error("Signup Error:", error);
      res.status(500).json({ message: "Internal Server Error." });
    }
  };
export const signIn = async (req: Request, res: Response) => {
  try {
    const { datas } = req.body;

    console.log(datas, "sungb-------------------------------------");

    if (!datas.email || !datas.password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email: datas.email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(datas.password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password." });
    }
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || "your_secret_key",
      { expiresIn: "7d" }
    );

    res.cookie("access_token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Sign-in successful!",
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        dob: user.dob,
        preferences: user.preferences,
        image: user.image,
      },
    });
  } catch (error) {
    console.error("Sign-In Error:", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};

export const updateUserProfile = async (req: Request, res: Response) => {
    try {
      const { datas, userId, } = req.body;
  console.log("byyyyyyyy",datas);
  
      // Validate request data
      const { error } = updateProfileSchema.validate(datas, { abortEarly: false });
      if (error) {
        const errors = error.details.map((err) => err.message);
        console.log(errors,'1111111111111111111111');
        
        return res.status(400).json({ message: "Validation error", errors });
      }
  
      // Find the user
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
          // Check if the new email already exists (excluding the current user)
    if (datas.email && datas.email !== user.email) {
        const existingUser = await User.findOne({ email: datas.email });
        if (existingUser) {
          return res.status(400).json({ message: "Email is already in use by another account." });
        }
      }

          // Password update logic
    if (datas.currentPassword && datas.newPassword) {
        // Verify current password
        const isMatch = await bcrypt.compare(datas.currentPassword, user.password);
        if (!isMatch) {
          return res.status(400).json({ message: "Current password is incorrect." });
        }
        console.log(datas.currentPassword);
        
        // Validate new password length
        if (datas.newPassword.length < 6) {
          return res.status(400).json({ message: "New password must be at least 6 characters long." });
        }
  
        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(datas.newPassword, salt);
  
        // Update password
        user.password = hashedPassword;
      }
      // Update fields dynamically
      Object.keys(datas).forEach((key) => {
        if (datas[key] !== undefined) {
          (user as any)[key] = datas[key];
        }
      });
  
      const result = await user.save();
      if (result) {
        res.status(200).json({
          message: "Profile updated successfully!",
          user: {
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            dob: user.dob,
            preferences: user.preferences,
            image: user.image,
          },
        });
      }
    } catch (error) {
      console.error("Update Profile Error:", error);
      res.status(500).json({ message: "Internal Server Error." });
    }
  };