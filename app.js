const router = require("");
const bodyParser = require("body-parser");

// Security Middlewares Lib Imports

const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");

// Database Lib Import
const mongoose = require("mongoose");

// Security Middleware Implementation
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

// Limit request body size limit to 50MB for JSON and URL-encoded form data

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

// Parse incoming request bodies as JSON
app.use(bodyParser.json());

// Apply rate limiting: max 3000 requests per 1560 seconds (26 minutes) per IP

const limiter = rateLimit({
  windowsMs: 1560 * 1000,
  max: 3000,
});

// MongoDB Database Connection
const URL =
  "mongodb+srv://<username>:<password>@cluster0.vidqntm.mongodb.net/inventory_management_system?retryWrites=true&w=majority";
const option = { user: "rmshanto786", pass: "shanto786", autoIndex: true };

mongoose
  .connect(URL, option)
  .then((res) => {
    console.log("Database Connected Successfully");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/v1", router);

app.use("*", (req, res) => {
  res.status(404).json({
    status: "fail",
    data: "Not Found",
  });
});
module.exports = app;
