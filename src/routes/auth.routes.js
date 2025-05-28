const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth.controller");

router.get("/validar", controller.validarUsuario);

module.exports = router;
