import status from "http-status";
import AppError from "../../errHelpers/AppError";
import { prisma } from "../../lib/prisma";

const getAllUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        isDeleted: true,
        emailVerified: true,
        deletedAt: true,
        image: true,
        needPasswordReset: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return users;
  } catch (error) {
    throw new AppError(status.INTERNAL_SERVER_ERROR, "Failed to fetch users");
  }
};

const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        isDeleted: true,
        emailVerified: true,
        deletedAt: true,
        image: true,
        needPasswordReset: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!user) {
      throw new AppError(status.NOT_FOUND, "User not found");
    }
    return user;
  } catch (error) {
    throw new AppError(status.INTERNAL_SERVER_ERROR, "Failed to fetch user");
  }
};

const deleteUserById = async (id: string) => {
  try {
    const user = await prisma.user.update({
      where: { id },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });

    if (!user) {
      throw new AppError(status.NOT_FOUND, "User not found");
    }
    return user;
  } catch (error) {
    throw new AppError(status.INTERNAL_SERVER_ERROR, "Failed to delete user");
  }
};

export const UserServices = {
  getAllUsers,
  getUserById,
  deleteUserById,
};
