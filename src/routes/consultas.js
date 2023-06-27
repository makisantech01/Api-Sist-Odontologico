import { Router } from "express";
import catchedAsync from "../utils/catchedAsync.js";
import {
  getAllConsultas,
  getConsulta,
  createConsulta,
  updateConsulta,
  deleteConsulta,
} from "../controllers/consulta.js";

const router = Router();

router.get("/", catchedAsync(getAllConsultas));
router.get("/:id", catchedAsync(getConsulta));
router.post("/:dni", catchedAsync(createConsulta));
router.put("/:id", catchedAsync(updateConsulta));
router.delete("/:id", catchedAsync(deleteConsulta));

export default router;
