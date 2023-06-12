import { Router } from "express";
import pacientes from "./pacientes.js";
import consultas from "./consultas.js";
import turnos from "./turnos.js";
import historiales from "./historiales.js";
import productos from "./productos.js";

const router = Router();

router.use("/pacientes", pacientes);
router.use("/consultas", consultas);
router.use("/turnos", turnos);
router.use("/historiales", historiales);
router.use("/productos", productos);

export default router;
