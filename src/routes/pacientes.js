import { Router } from "express";
import catchedAsync from "../utils/catchedAsync.js";
import {
  getAllPacientes,
  getPaciente,
  createPaciente,
  updatePaciente,
  deletePaciente,
} from "../controllers/paciente.js";

const router = Router();

router.get("/", catchedAsync(getAllPacientes));
router.get("/:dni", catchedAsync(getPaciente));
router.post("/:id", catchedAsync(createPaciente));
router.put("/:dni", catchedAsync(updatePaciente));
router.delete("/:dni", catchedAsync(deletePaciente));

export default router;
