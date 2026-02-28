import { Router } from "express";
import { AuthController } from "./auth.controller";
import { zodValidation } from "../../middleware/zodValidation";
import {
  createCustomerZodSchema,
  createRestaurantZodSchema,
} from "./auth.validation";

const router = Router();
router.post(
  "/create-customer",
  zodValidation(createCustomerZodSchema),
  AuthController.createCustomer,
);
router.post(
  "/create-provider",
  zodValidation(createRestaurantZodSchema),
  AuthController.createRestaurant,
);

router.post("/login", AuthController.login);
// router.post("/logout", )

export const AuthRotes = router;
