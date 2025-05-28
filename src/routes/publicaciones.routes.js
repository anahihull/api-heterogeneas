const express = require("express");
const router = express.Router();
const controller = require("../controllers/publicaciones.controller");

router.post("/", controller.crearPublicacion);
router.put("/:id/aprobar", controller.aprobarPublicacion);
router.get("/aprobadas", controller.publicacionesAprobadas);
router.get("/aprobadas/categoria/:categoria_id", controller.publicacionesAprobadasPorCategoria);
router.get("/usuario/:userId", controller.publicacionesPorUsuarioYStatus);

module.exports = router;