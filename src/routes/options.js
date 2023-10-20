import { Router } from "express";
import catchedAsync from "../utils/catchedAsync.js";
import { deleteAllOptions, getAllOptions } from "../controllers/option.js";

const router = Router();

router.get("/", catchedAsync(getAllOptions));
router.delete("/", catchedAsync(deleteAllOptions));

export default router;
