import { Router } from "express";
import pacientes from "./pacientes.js";
import consultas from "./consultas.js";
import turnos from "./turnos.js";
import historiales from "./historiales.js";
import productos from "./productos.js";
import odontogramas from "./odontogramas.js";
import usuarios from "./usuarios.js";
import login from "./login.js";
import calendar from "./calendar.js";
import dientes from "./dientes.js";

const router = Router();

router.use("/pacientes", pacientes);
router.use("/consultas", consultas);
router.use("/turnos", turnos);
router.use("/historiales", historiales);
router.use("/productos", productos);
router.use("/odontogramas", odontogramas);
router.use("/dientes", dientes);
router.use("/usuarios", usuarios);
router.use("/", login);
router.use("/google", calendar);

export default router;
