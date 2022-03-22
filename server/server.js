const express = require("express"),
  app = express(),
  port = 1000;

// const router = require("./src/routes/router");
// app.use("/", router);

app.get("/", (req, res) => {
  res.send("This is from express.js");
});

app.listen(port, () => {
  console.log(`listening at port ${port}`);
});
