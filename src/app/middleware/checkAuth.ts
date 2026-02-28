import { NextFunction, Request, Response } from "express";
import { UserRole } from "../../generated/enums";
import AppError from "../errHelpers/AppError";
import status from "http-status";
import { CookieUtils } from "../utils/cookie";
import { prisma } from "../lib/prisma";

const checkAuth =
  (...authRoles: UserRole[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const sessionToken = CookieUtils.getCookie(
      req,
      "better-auth.session_token",
    );
    if (!sessionToken) {
      throw new AppError(
        status.UNAUTHORIZED,
        "Unauthorized: No session token provided",
      );
    }
    if (sessionToken) {
      const sessionExists = await prisma.session.findUnique({
        where: { token: sessionToken },
      });
      if (!sessionExists) {
        throw new AppError(
          status.UNAUTHORIZED,
          "Unauthorized: Invalid session token",
        );
      }
      
    }
  };
