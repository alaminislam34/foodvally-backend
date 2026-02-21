import { Response } from "express";

export const sendResponse = async (
  res: Response,
  resData: {
    statusCode: number;
    success: boolean;
    message: string;
    data?: any;
  },
) => {
  const { success, message, data, statusCode } = resData;
  res.status(statusCode).json({
    success,
    message,
    data,
  });
};
