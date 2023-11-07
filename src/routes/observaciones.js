import { Router } from "express";
import catchedAsync from "../utils/catchedAsync.js";
import { createObservacion, deleteObservacion, getObservaciones, getAllObservaciones, updateObservacion } from "../handlers/observacion.handler.js";

const router = Router();

router.get("/", catchedAsync(getAllObservaciones));
router.get("/:id", catchedAsync(getObservaciones));
router.post("/:id", catchedAsync(createObservacion));
router.put("/:id", catchedAsync(updateObservacion));
router.delete("/:id", catchedAsync(deleteObservacion));

export default router;
