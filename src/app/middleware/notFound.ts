import { NextFunction, Request, Response } from "express";
import status from "http-status";

export const notFound = async (
  _error: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  res.status(status.NOT_FOUND).json({
    success: false,
    message: "Route not found",
  });
};
