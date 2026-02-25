import { Router } from "express";
import { login, register } from "./auth.controller";
import { AuthRequest, requireAuth } from "./auth.middleware";

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.get("/me", requireAuth, (req: AuthRequest, res) => {
  res.json({ message: "success", user: req.user });
});

export default router;
