import { Router } from "express";
import { login, logout, register } from "./auth.controller";
import { AuthRequest, requireAuth } from "./auth.middleware";

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.get("/profile", requireAuth, (req: AuthRequest, res) => {
  res.json({ user: req.user });
});
router.get("/logout", logout);

export default router;
