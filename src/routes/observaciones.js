import { Router } from "express";
import catchedAsync from "../utils/catchedAsync.js";
import { createObservacion, deleteObservacion, getAllObservaciones, updateObservacion } from "../handlers/observacion.handler.js";

const router = Router();

router.get("/:id", catchedAsync(getAllObservaciones));
router.post("/:id", catchedAsync(createObservacion));
router.put("/:id", catchedAsync(updateObservacion));
router.delete("/:id", catchedAsync(deleteObservacion));

export default router;
