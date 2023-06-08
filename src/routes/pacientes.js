import { Router } from "express";
import catchedAsync from "../utils/catchedAsync.js";
import { getAllPacientes } from "../controllers/paciente.js";

const router = Router();

router.get("/", catchedAsync(getAllPacientes));

export default router;
