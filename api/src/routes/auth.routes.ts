import { Router } from "express";

import { AuthController } from "../controllers/AuthController";
import { authenticateToken } from "../middleware/authenticateToken";
import AuthValidator from "../validators/AuthValidator";

const router = Router();
const authController = new AuthController();

router.post(
  "/register",
  AuthValidator.validate("register"),
  authController.register,
);

router.post("/login", AuthValidator.validate("login"), authController.login);

router.get("/auth", authenticateToken, authController.auth);

export default router;
