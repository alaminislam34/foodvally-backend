import { Router } from "express";
import { AuthRotes } from "../module/auth/auth.routes";
import { CategoryRoutes } from "../module/foodCategory/category.routes";
import { UserRoutes } from "../module/user/user.routes";

const router = Router();

router.use("/auth", AuthRotes);
router.use("/food-categories", CategoryRoutes);
router.use("/users", UserRoutes);

export const IndexRoutes = router;
