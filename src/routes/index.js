import { Router } from "express";
import pacientes from "./pacientes.js";
import consultas from "./consultas.js";
import turnos from "./turnos.js";
import historiales from "./historiales.js";

const router = Router();

router.use("/pacientes", pacientes);
router.use("/consultas", consultas);
router.use("/turnos", turnos);
router.use("/historiales", historiales);

export default router;
