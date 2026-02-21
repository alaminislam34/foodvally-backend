import { Router } from "express";
import { AuthController } from "./auth.controller";

const router = Router();
router.post("/create-customer", AuthController.createCustomer);

export const AuthRotes = router;
