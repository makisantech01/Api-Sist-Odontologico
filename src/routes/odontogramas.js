import { Router } from "express";
import catchedAsync from "../utils/catchedAsync.js";
import {
  getAllOdontogramas,
  getOdontograma,
  createOdontograma,
  updateOdontograma,
  deleteOdontograma,
  getAllDientes,
  getDienteById,
  createDiente,
  updateDiente,
  deleteDiente,
} from "../controllers/odontograma.js";

const router = Router();

router.get("/", catchedAsync(getAllOdontogramas));
router.get("/:id", catchedAsync(getOdontograma));
router.post("/:id", catchedAsync(createOdontograma));
router.put("/:id", catchedAsync(updateOdontograma));
router.delete("/:id", catchedAsync(deleteOdontograma));

// Rutas para los dientes del odontograma
router.get("/dientes", catchedAsync(getAllDientes));
router.get("/dientes/:id", catchedAsync(getDienteById));
router.post("/dientes", catchedAsync(createDiente));
router.put("/dientes/:id", catchedAsync(updateDiente));
router.delete("/dientes/:id", catchedAsync(deleteDiente));

export default router;
