import { Router } from "express";
import { AuthController } from "./auth.controller";

const router = Router();
router.post("/create-customer", AuthController.createCustomer);
router.post("/create-provider", AuthController.createRestaurant);
router.post("/login", AuthController.login);

export const AuthRotes = router;
