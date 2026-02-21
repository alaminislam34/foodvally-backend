import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { AuthService } from "./auth.service";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";

const createCustomer = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await AuthService.createCustomer(payload);
  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Customer created successfully",
    data: result,
  });
});

export const AuthController = {
  createCustomer,
};
