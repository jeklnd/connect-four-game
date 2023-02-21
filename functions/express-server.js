const express = require("express");
const app = express();
const path = require("path");
const livereload = require("livereload");
const publicDirectory = path.join(__dirname, "public");
const serverless = require("serverless-http");
// const nodemailer = require("nodemailer");
// require("dotenv").config();
// const bodyParser = require("body-parser");
// const helmet = require("helmet");

app.use(express.static(publicDirectory));
// app.use(bodyParser.json());
// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// );
// app.use(helmet());
app.set("views", "./views");
app.set("view engine", "ejs");

// live-reload browser on client side changes
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(publicDirectory);

// routes
app.get("/", (req, res) => {
  res.render("index.html");
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