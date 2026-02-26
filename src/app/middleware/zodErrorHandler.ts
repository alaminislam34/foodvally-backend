import { NextFunction, Request, Response } from "express";
import status from "http-status";
import z from "zod";
import { handleZodErrors } from "../errorHelpers/handleZodError";

const zodErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = status.INTERNAL_SERVER_ERROR;
  let message = "An unexpected error occurred";
  if (err instanceof z.ZodError) {
    const simplifiedErrors = handleZodErrors(err);

    message = simplifiedErrors.message;
  }
};
