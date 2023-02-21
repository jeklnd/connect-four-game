const express = require("express");
const app = express();
const path = require("path");
const publicDirectory = path.join(__dirname, "public");
const serverless = require("serverless-http");
const ejs = require("ejs");

app.use(express.static(publicDirectory));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/game", (req, res) => {
  res.render("game");
});

app.get("/rules", (req, res) => {
  res.render("rules");
});

app.get("/pause", (req, res) => {
  res.render("pause");
});

app.listen(process.env.PORT || 5000, () => {
  if (process.env.PORT) {
    console.log("Listening on port " + process.env.PORT);
  } else {
    console.log("Listening on port " + 5000);
  }
});

// Wrap the express app with serverless-http
const serverlessApp = serverless(app);

// Export the serverless app
module.exports.handler = async (event, context) => {
  const response = await serverlessApp(event, context);
  return response;
};