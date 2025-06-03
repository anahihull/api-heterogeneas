const express = require("express");
const router = express.Router();
const controller = require("../controllers/categorias.controller");

router.get("/", controller.getCategorias);

module.exports = router; 