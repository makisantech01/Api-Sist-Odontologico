import { Router } from "express";
import catchedAsync from "../utils/catchedAsync.js";
import { getAuthUrl, getRedirect } from "../middlewares/calendar.js";

const router = Router();

router.get("/", getAuthUrl);
router.get("/redirect", getRedirect);

export default router;
