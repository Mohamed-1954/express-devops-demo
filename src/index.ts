import express from "express";
import helmet from "helmet";
import config from "./config/config";
import cookieParser from "cookie-parser";
import cors from "cors";

// Import Routers
import studentsService from "@/services/students/routes";

const app = express();

app.use(helmet());
app.disable("x-powered-by");
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: config.server.corsOrigins || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

const API_PREFIX = "/api/v1";

app.use(`${API_PREFIX}/students`, studentsService)

app.listen(config.server.port, () => {
  console.log(`🚀 Server running in ${config.env} mode on port ${config.server.port}`);
  if (config.env === "development") {
    console.log(`➜ Local: http://${config.server.host}:${config.server.port}`);
  }
})

export default app;