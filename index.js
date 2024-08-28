const express = require("express");
const app = express();
require("dotenv").config();
const client = require("./db/client");
client.connect();
const PORT = 3000;
app.use(express.json());

console.log(process.env.JWT_SECRET);
// we're registering the routes in /api/index.js ===> IOW, request to /api ---> send request to /api/index.js
app.use("/api", require("./api"));

app.get("/", (req, res) => {
  res.send("Hello from our server");
});

app.use((err, req, res, next) => {
  res.status(500).send("Something broke...");
});

app.listen(PORT, () => {
  console.log(`Server alive on port ${PORT}`);
});
