import status from "http-status";
import z from "zod";
import { TErrorResponse, TErrorSources } from "../interfaces/zodError";

export const handleZodError = (err: z.ZodError): TErrorResponse => {
  let statusCode = status.BAD_REQUEST;
  let message = "Zod validation error";
  let errorSources: TErrorSources[] = [];

  err.issues.forEach((issue) => {
    errorSources.push({
      path: issue.path.length > 0 ? issue.path.join(".") : "",
      message: issue.message,
    });
  });

  return {
    success: false,
    statusCode,
    message,
    errorSource: errorSources,
  };
};
