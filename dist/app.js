import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import router from "./routes/index.js";
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(morgan("dev"));

app.use(router);

// 404 handler

app.use("*", (req, res) => {
  res.status(404).send("404 Not found");
});

// Error handler

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).send({
    error: true,
    message: err.message
  });
});

export default app;