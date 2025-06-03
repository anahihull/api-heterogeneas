const express = require("express");
const router = express.Router();

router.use("/solicitudes", require("./solicitudes.routes"));
router.use("/publicaciones", require("./publicaciones.routes"));
router.use("/recursos", require("./recursos.routes"));
router.use("/eventos", require("./eventos.routes"));
router.use("/auth", require("./auth.routes"));
router.use("/preguntas", require("./preguntas.routes"));
router.use("/respuestas", require("./respuestas.routes"));
router.use("/status", require("./status.routes"));
router.use("/materias", require("./materias.routes"));
router.use("/categorias", require("./categorias.routes"));

module.exports = router;