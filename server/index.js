const express = require("express");
const app = express(); // create express app
const path = require("path");

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

//is this needed(index.html in the build folder)
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

//is this needed
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const router = require("./routes/router");
app.use("/", router);

// start express server on port 1000
app.listen(3000, () => {
  console.log("server started on port 3000");
});
