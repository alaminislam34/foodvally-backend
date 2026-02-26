import { NextFunction, Request, Response } from "express";
import z from "zod";
import { envVars } from "../../config/env";
import { TErrorSources } from "../interfaces/zodError";
import status from "http-status";
import { handleZodError } from "../errHelpers/zodErrorHandler";
import AppError from "../errHelpers/AppError";

export const globalErrorHandler = (
  err: any,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (envVars.NODE_ENV === "development") {
    console.error("Global Error Handler:", err);
  }

  let ErrorSource: TErrorSources[] = [];
  let statusCode: number = status.INTERNAL_SERVER_ERROR;
  let message: string = "An unexpected error occurred";
  let stack: string | undefined = err.stack;

  if (err instanceof z.ZodError) {
    const simplifiedErrors = handleZodError(err);
    statusCode = simplifiedErrors.statusCode;
    message = simplifiedErrors.message;
    ErrorSource = [...simplifiedErrors.errorSource];
    stack = err.stack;
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    stack = err.stack;
    ErrorSource.push({
      path: "",
      message: err.message,
    });
  } else if (err instanceof Error) {
    message = err.message;
    statusCode = status.INTERNAL_SERVER_ERROR;
    stack = err.stack;
  }

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errorSource: ErrorSource,
    error: envVars.NODE_ENV === "development" ? err : undefined,
    stack: envVars.NODE_ENV === "development" ? stack : undefined,
  });
};
