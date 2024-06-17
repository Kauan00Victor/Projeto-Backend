const express = require("express");

const controllerMusicas = require("../controllers/controller_musica");

const router = express.Router();

router.post("/", controllerMusicas.validar, controllerMusicas.criar);

router.get("/", controllerMusicas.listarTodos);

router.get("/:id", controllerMusicas.buscarPeloId, controllerMusicas.obter);

router.put("/:id", controllerMusicas.buscarPeloId, controllerMusicas.validar, controllerMusicas.atualizar);

router.delete("/:id", controllerMusicas.buscarPeloId, controllerMusicas.remover);

module.exports = router;