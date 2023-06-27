import { Router } from "express";
import catchedAsync from "../utils/catchedAsync.js";
import {
  getAllUsuarios,
  getUsuario,
  createUsuario,
  updateUsuario,
  deleteUsuario,
} from "../controllers/usuario.js";

const router = Router();

router.get("/", catchedAsync(getAllUsuarios));
router.get("/:dni", catchedAsync(getUsuario));
router.post("/", catchedAsync(createUsuario));
router.put("/:dni", catchedAsync(updateUsuario));
router.delete("/:dni", catchedAsync(deleteUsuario));

export default router;
