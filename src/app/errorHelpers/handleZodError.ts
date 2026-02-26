import status from "http-status";
import z from "zod";
import { TErrorResponse, TErrorSources } from "../interfaces/zodError";

export const handleZodErrors = (err: z.ZodError): TErrorResponse => {
  let statusCode = status.BAD_REQUEST;
  let message = "Zod Validation error";
  let errorSource: TErrorSources[] = [];

  err.issues.forEach((issue) => {
    errorSource.push({
      path:
        issue.path.length > 1 ? issue.path.join(".") : issue.path[0].toString(),
      message: issue.message,
    });
  });

  return {
    success: false,
    statusCode,
    message,
    errorSource,
  };
};
