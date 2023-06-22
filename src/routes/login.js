import { Router } from "express";
import catchedAsync from "../utils/catchedAsync.js";
import { login, logout } from "../middlewares/login.js";

const router = Router();

router.post("/login", catchedAsync(login));
router.post("/logout", catchedAsync(logout));

export default router;
