import express, { Application, Request, Response } from "express";
import { IndexRoutes } from "./app/Routes";
import { notFound } from "./app/middleware/notFound";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import cors from "cors";
import cookieParser from "cookie-parser";

const app: Application = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Foodvally API");
});

app.use("/api/v1", IndexRoutes);

// middleware
app.use(notFound);
app.use(globalErrorHandler);

export default app;
