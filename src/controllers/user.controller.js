const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userRepo = require("../repository/user.repository");
const {
  userValidationSchema,
  loginUserSchema,
} = require("../utils/validations/user");
const { formatValidationErrorMessage } = require("../utils/formater");
const {
  hashPassword,
  comparePassword,
  generateAccessToken,
} = require("../utils/encryption");

const register = async (req, res) => {
  // Validate user data
  const { error } = userValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: false,
      data: null,
      message: formatValidationErrorMessage(error.message),
    });
  }
  const { name, phone_number, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await userRepo.GetUserByEmail(email);
    if (existingUser)
      return res.status(409).json({
        status: false,
        data: null,
        message: "User already exists",
      });

    // Create new user
    const hashPwd = await hashPassword(password);

    const user = await userRepo.CreateUser({
      name,
      phone_number,
      email,
      password: hashPwd,
    });

    delete user.password;

    res.status(201).json({
      status: true,
      data: user,
      message: "User created successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error creating user" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { error } = loginUserSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: false,
        data: null,
        message: formatValidationErrorMessage(error.message),
      });
    }
    // Find user by email
    const user = await userRepo.GetUserByEmail(email);
    if (!user)
      return res.status(400).json({
        status: false,
        data: null,
        message: "Invalid email or password",
      });

    // Check password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch)
      return res.status(400).json({
        status: false,
        data: null,
        message: "Invalid email or password",
      });

    // Generate JWT token
    const token = generateAccessToken({ userId: user.id });
    const userReponse = user._doc;
    delete userReponse.password;

    return res.status(200).json({
      status: true,
      data: {
        ...userReponse,
        token,
      },
      message: "Login successful",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error logging in" });
  }
};

module.exports = { register, login };
