const express = require("express");
const router = express.Router();
const controller = require("../controllers/preguntas.controller");

router.post("/", controller.crearPregunta);
router.get("/", controller.obtenerPreguntas);
router.get("/usuario/:userId", controller.preguntasPorUsuarioYStatus);

module.exports = router;