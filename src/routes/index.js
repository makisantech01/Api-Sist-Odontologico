import { Router } from "express";
import pacientes from "./pacientes.js";

const router = Router();

router.use("/pacientes", pacientes);

export default router;
