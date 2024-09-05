const express = require("express");

const userRouter = express.Router();
const {
  getUserById,
  getUserByEmail,
  getUsers,
  getUser,
  createUser,
} = require("../db/users");

const jwt = require("jsonwebtoken");

const { requireUser } = require("./utils");

userRouter.get("/", async (req, res, next) => {
  try {
    const results = await getUsers();
    res.send(results);
  } catch (err) {
    next(err);
  }
});

// {baseURL}
// userRouter.get("/:id", async(req,res,next)=>{

// {baseURL}
userRouter.get("/me", requireUser, (req, res) => {
  res.send("Account Information");
});

// POST request {baseURL/api/users/register}
userRouter.post("/register", async (req, res, next) => {
  const { firstname, lastname, email, password } = req.body;
  if (!email) {
    next({
      name: "EmailRequiredError",
      message: "Email Not Provided",
    });
    return;
  }

  if (!password) {
    next({ name: "PasswordRequiredError", message: "Password Not Provided" });
    return;
  }

  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      next({
        name: "ExistingUserError",
        message: "User is Registered with that Email",
      });
      return;
    }

    const result = await createUser(req.body);
    if (result) {
      //TODO
      const token = jwt.sign(
        { id: userRouter.id, email },
        process.env.JWT_SECRET,
        { expiresIn: "1w" }
      );

      res.send({
        message: "Registration is Successful!",
        token,
        user: {
          id: result.id,
          firstname: result.firstname,
          lastname: result.lastname,
          email: result.email,
        },
      });
    } else {
      next({
        name: "RegistrationError",
        message: "Error Registering, Try Later",
      });
      return;
    }

    res.send("Success");
  } catch (err) {
    console.log("Register Error:", err);
    next(err);
  }
});

// POST request to {baseURL/api/login}
userRouter.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please give your Email and Password",
    });
  }
  try {
    const result = await getUser(req.body);
    if (result) {
      // create you token here and send with user id and email
      const token = jwt.sign({ id: result.id, email }, process.env.JWT_SECRET, {
        expiresIn: "1w",
      });
      res.send({ message: "Login Successful!", token });
    } else {
      next({
        name: "IncorrectCredentialsError",
        message: "Username or Password is Incorrect",
      });
    }
  } catch (err) {
    next(err);
  }
});

userRouter.get("/test", async (req, res, next) => {
  try {
    //need to check
    res.json();
  } catch (err) {
    next(err);
  }
});

module.exports = userRouter;
