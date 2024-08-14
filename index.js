// (check point) console.log("Hello World!");

const express = require("express");
const app = express();

const PORT = 3000;

app.use(express.json());
// registering routes in /api/index.js -> IOW, request to /api -> send requesto to /api/index.js
app.use("/api", require("./api"));

// localhost:3000/api
app.get("/", (req, res) => {
  res.send("Hello from the Server");
});

app.listen(PORT, () => {
  console.log(`Server alive on port ${PORT}`);
});
