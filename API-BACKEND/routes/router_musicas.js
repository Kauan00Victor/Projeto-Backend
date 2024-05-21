const express = require("express");

const controllerMusicas = require("../controllers/controller_musica");

const router = express.Router();

router.post("/", controllerMusicas.validar, controllerMusicas.criar);



module.exports = router;