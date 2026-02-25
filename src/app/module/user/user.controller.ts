import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { UserServices } from "./user.service";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.getAllUsers();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Users fetched successfully",
    data: result,
  });
});

const getUserById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserServices.getUserById(id as string);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User fetched successfully",
    data: result,
  });
});

const deleteUserById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserServices.deleteUserById(id as string);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User deleted successfully",
    data: result,
  });
});

const updateUserById = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await UserServices.updateUserById(payload);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User updated successfully",
    data: result,
  });
});

export const UserController = {
  getAllUsers,
  getUserById,
  deleteUserById,
  updateUserById,
};
