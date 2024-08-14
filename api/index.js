const express = require("express");

const apiRouter = express.Router();
// register routes for requests that have
apiRouter.use("/books", require("./books"));

// register routes for requests of form {baseUrl}/api/users
apiRouter.use("/users", require("./users"));

// baseurl/api
apiRouter.get("/", (req, res) => {
  res.send("Hello from/api");
});

// /api/user
module.exports = apiRouter;
