import { Router } from "express";
import catchedAsync from "../utils/catchedAsync.js";
import {
  getAllOdontogramas,
  getOdontograma,
  createOdontograma,
  updateOdontograma,
  deleteOdontograma,
} from "../handlers/odontograma.handler.js";

const router = Router();

router.get("/", catchedAsync(getAllOdontogramas));
router.get("/:id", catchedAsync(getOdontograma));
router.post("/:id", catchedAsync(createOdontograma));
router.put("/:id", catchedAsync(updateOdontograma));
router.delete("/:id", catchedAsync(deleteOdontograma));

export default router;
