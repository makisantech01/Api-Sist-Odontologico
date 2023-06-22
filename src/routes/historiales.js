import { Router } from "express";
import catchedAsync from "../utils/catchedAsync.js";
import {
  getAllHistoriales,
  getHistorial,
  createHistorial,
  updateHistorial,
  deleteHistorial,
} from "../controllers/historial.js";

const router = Router();

router.get("/", catchedAsync(getAllHistoriales));
router.get("/:id", catchedAsync(getHistorial));
router.post("/:dni", catchedAsync(createHistorial));
router.put("/:id", catchedAsync(updateHistorial));
router.delete("/:id", catchedAsync(deleteHistorial));

export default router;
