const express = require("express");
const app = express();
const path = require("path");
const publicDirectory = path.join(__dirname, "public");
const serverless = require("serverless-http");

app.use(express.static(publicDirectory));

app.get("/", (req, res) => {
  res.sendFile(path.join(publicDirectory, "index.html"));
});

app.get("/game", (req, res) => {
  res.sendFile(path.join(publicDirectory, "game.html"));
});

app.get("/rules", (req, res) => {
  res.sendFile(path.join(publicDirectory, "rules.html"));
});

app.get("/pause", (req, res) => {
  res.sendFile(path.join(publicDirectory, "pause.html"));
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