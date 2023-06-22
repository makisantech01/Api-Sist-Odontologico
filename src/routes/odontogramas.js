import { Router } from "express";
import catchedAsync from "../utils/catchedAsync.js";
import {
  getAllOdontogramas,
  getOdontograma,
  createOdontograma,
  updateOdontograma,
  deleteOdontograma,
} from "../controllers/odontograma.js";

const router = Router();

router.get("/", catchedAsync(getAllOdontogramas));
router.get("/:id", catchedAsync(getOdontograma));
router.post("/:dni", catchedAsync(createOdontograma));
router.put("/:id", catchedAsync(updateOdontograma));
router.delete("/:id", catchedAsync(deleteOdontograma));

export default router;
