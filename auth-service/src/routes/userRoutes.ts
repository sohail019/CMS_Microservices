import { Router } from "express";
import { UserAuthController } from "../controllers/userAuthController";

const router: Router = Router();

router.post("/signup", UserAuthController.signup);
router.post("/login", UserAuthController.login);
router.post("/logout", UserAuthController.logout);
router.post("/refresh", UserAuthController.refresh);
router.post("/forgot-password", UserAuthController.forgotPassword);
router.post("/reset-password", UserAuthController.resetPassword);
router.post("/verify-email", UserAuthController.verifyEmail);

export default router;
