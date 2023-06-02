const { Router } = require("express");
const pacientes = require("./pacientes");

const router = Router();

router.use("/pacientes", pacientes);

module.exports = router;
