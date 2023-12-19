import { Router } from "express";
import catchedAsync from "../utils/catchedAsync.js";
import {
  createUsuario,
  getUsuario,
  getAllUsuarios,
  updateUsuario,
  deleteUsuario,
} from "../handlers/usuario.handler.js"
import authenticateAndAuthorize from "../middlewares/authenticateAndAuthorize.js";

const router = Router();

router.get("/", authenticateAndAuthorize({ requireAdmin: true }), catchedAsync(getAllUsuarios));
router.get("/:dni", catchedAsync(getUsuario));
router.post("/", catchedAsync(createUsuario));
router.put("/:dni", authenticateAndAuthorize({}), catchedAsync(updateUsuario));
router.delete("/:dni", catchedAsync(deleteUsuario));

export default router;