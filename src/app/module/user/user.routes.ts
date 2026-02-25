import { Router } from "express";
import { UserController } from "./user.controller";
import { zodValidation } from "../../middleware/zodValidation";
import { updateUserZodSchema } from "./user.validation";

const router = Router();

router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getUserById);
router.put("/delete/:id", UserController.deleteUserById);
router.put(
  "/:id",
  zodValidation(updateUserZodSchema),
  UserController.updateUserById,
);

export const UserRoutes = router;
