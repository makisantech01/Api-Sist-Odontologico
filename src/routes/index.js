import { Router } from "express";
import pacientes from "./pacientes.js";
import consultas from "./consultas.js";

const router = Router();

router.use("/pacientes", pacientes);
router.use("/consultas", consultas);

export default router;
