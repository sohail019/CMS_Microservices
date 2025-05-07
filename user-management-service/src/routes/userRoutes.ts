import { Router } from "express";
import { getUsersController } from "../controllers/userController";

const router: Router = Router();

router.get("/users", getUsersController);

export default router;
