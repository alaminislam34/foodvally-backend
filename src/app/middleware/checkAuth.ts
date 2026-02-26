import { NextFunction, Request, Response } from "express";
import { UserRole } from "../../generated/enums";

const checkAuth =
  (...authRoles: UserRole[]) =>
  (req: Request, res: Response, next: NextFunction) => {};
