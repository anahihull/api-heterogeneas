const express = require("express");
const router = express.Router();
const controller = require("../controllers/respuestas.controller");

router.post("/", controller.crearRespuesta);
router.put("/:id/aprobar", controller.aprobarRespuesta);
router.get("/por-pregunta/:id", controller.respuestasAprobadasPorPregunta);
router.get("/pendientes", controller.respuestasPendientes);


module.exports = router;