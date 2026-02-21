import { Router } from "express";
import { AuthRotes } from "../module/auth/auth.routes";
import { CategoryRoutes } from "../module/foodCategory/category.routes";

const router = Router();

router.use("/auth", AuthRotes);
router.use("/foodCategories", CategoryRoutes);

export const IndexRoutes = router;
