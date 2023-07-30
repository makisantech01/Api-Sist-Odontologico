import { Router } from "express";
import catchedAsync from "../utils/catchedAsync.js";
import {
  getAllDientes,
  getDienteById,
  createDiente,
  updateDiente,
  deleteDiente,
} from "../controllers/diente.js";

const router = Router();

router.get("/", catchedAsync(getAllDientes));
router.get("/:id", catchedAsync(getDienteById));
router.post("/", catchedAsync(createDiente));
router.put("/:id", catchedAsync(updateDiente));
router.delete("/:id", catchedAsync(deleteDiente));

export default router;
