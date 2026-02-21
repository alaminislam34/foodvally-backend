import express, { Application } from "express";
import { IndexRoutes } from "./app/Routes";
import { notFound } from "./app/middleware/notFound";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";

const app: Application = express();

app.use(express.json());

app.use("/api/v1", IndexRoutes);

// middleware
app.use(notFound);
app.use(globalErrorHandler);

export default app;
