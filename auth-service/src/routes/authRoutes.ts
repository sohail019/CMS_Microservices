import { Router } from "express";
import { loginController } from "../controllers/authController";
import { validateLogin } from "../validations/authValidation";

const router: Router = Router();

router.post("/login", validateLogin, loginController);

export default router;
