const express = require("express");
const router = express.Router();
const controller = require("../controllers/eventos.controller");

router.post("/", controller.crearEvento);
router.put("/:id/aprobar", controller.aprobarEvento);
router.get("/filtrados", controller.eventosFiltradosPorStatus);

module.exports = router;