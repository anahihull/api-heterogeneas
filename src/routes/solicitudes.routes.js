const express = require("express");
const router = express.Router();
const controller = require("../controllers/solicitudes.controller");

router.post("/", controller.crearSolicitud);
router.get("/pendientes", controller.obtenerPendientes);
router.put("/:id/aprobar", controller.aprobarSolicitud);

module.exports = router;