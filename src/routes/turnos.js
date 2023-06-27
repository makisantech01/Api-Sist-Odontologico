import { Router } from "express";
import catchedAsync from "../utils/catchedAsync.js";
import {
  getAllTurnos,
  getTurno,
  createTurno,
  updateTurno,
  deleteTurno,
} from "../controllers/turno.js";

const router = Router();

router.get("/", catchedAsync(getAllTurnos));
router.get("/:id", catchedAsync(getTurno));
router.post("/:dni", catchedAsync(createTurno));
router.put("/:id", catchedAsync(updateTurno));
router.delete("/:id", catchedAsync(deleteTurno));

export default router;
