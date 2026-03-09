import { User } from "../models/user/user_model.js";
import { createJWT } from "../utils/jwt.js";
import { comparePassword, hashedPassword } from "../utils/hash.js";

export const Register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const hashedPass = await hashedPassword(password);

    const newUser = await User.create({
      userName,
      email,
      password: hashedPass,
    });

    res.status(201).json({
      message: "Registered successfully",
      user: {
        userId: newUser.userId,
        userName: newUser.userName,
        email: newUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error occurred",
      error: error.message,
    });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email",
      });
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Incorrect password",
      });
    }

    const token = createJWT({
      userId: user.userId,
      email: user.email,
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        userId: user.userId,
        userName: user.userName,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error occurred",
      error: error.message,
    });
  }
};