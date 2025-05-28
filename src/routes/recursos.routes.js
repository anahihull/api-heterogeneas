const express = require("express");
const router = express.Router();
const controller = require("../controllers/recursos.controller");

router.post("/", controller.crearRecurso);
router.put("/:id/aprobar", controller.aprobarRecurso);
router.get("/status/:status", controller.recursosPorStatus);
router.get("/materia/:materia_id", controller.recursosAprobadosPorMateria);
router.get("/usuario/:userId", controller.recursosPorUsuarioYStatus);

module.exports = router;