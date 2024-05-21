const mongoose = require("mongoose");
const Musica = require("../models/model_musicas");

async function validar(req, res, next) {
    const musica = new Musica(req.body);
    try {
        await musica.validate();
        next();
    } catch (err) {
        res.status(422).json({ msg: "Dados da musica invalidos" });
    }
}

async function criar(req, res) {
    const musica = await Musica.create(req.body);
    res.status(201).json(musica);
}


module.exports = { validar, criar};