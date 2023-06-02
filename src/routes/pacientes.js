const { Router } = require("express");

const router = Router();

router.get("/", async (req, res) => {
  res.status(200).send("ruta prueba pacientes");
});

module.exports = router;
