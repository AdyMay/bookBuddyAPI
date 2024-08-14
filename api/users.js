const express = require("express");
const userRouter = expree.Router();

// {baseUrl/users/me}
userRouter.get("/me", (req, res) => {
  res.send("here is your account information");
});

// POST request to {baseUrl}/api/users/register
userRouter.post("/register", (req, res) => {
  console.log("REQUEST BODY", req.body);
  res.send("User Registered");
});

userRouter.post("/login", (req, res) => {
  console.log("REQUEST BODY", req.body);
  res.send("Logged in Successfully!");
});

module.exports = userRouter;
