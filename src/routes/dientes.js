import { Router } from "express";
import catchedAsync from "../utils/catchedAsync.js";
import {
  getAllDientes,
  getDienteById,
  createDiente,
  updateDiente,
  deleteDiente,
} from "../handlers/diente.handler.js";
import authenticateAndAuthorize from "../middlewares/authenticateAndAuthorize.js";

const router = Router();

router.get("/", authenticateAndAuthorize({ requireAdmin: true }), catchedAsync(getAllDientes));
router.get("/:id", authenticateAndAuthorize({ requireAdmin: false }), catchedAsync(getDienteById));
router.post("/:id", catchedAsync(createDiente));
router.put("/:id", catchedAsync(updateDiente));
router.delete("/:id", catchedAsync(deleteDiente));

export default router;
