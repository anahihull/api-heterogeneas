const express = require("express");
const router = express.Router();
const controller = require("../controllers/publicaciones.controller");

router.post("/", controller.crearPublicacion);                               // Crear nueva publicación (base64 a S3)
router.put("/:id/aprobar", controller.aprobarPublicacion);                  // Aprobar publicación
router.get("/aprobadas", controller.publicacionesAprobadas);                // Todas las aprobadas
router.get("/aprobadas/categoria/:categoria_id", controller.publicacionesAprobadasPorCategoria); // Aprobadas por categoría
router.get("/usuario/:userId", controller.publicacionesPorUsuarioYStatus);  // Por usuario y estado (query param)
router.get("/pendientes", controller.publicacionesPendientes);              // Todas las pendientes


module.exports = router;