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
async function listarTodos(req, res) {
    const musicas = await Musica.find({});
    res.json(musicas);
}

async function buscarPeloId(req, res, next) {
    try {
        const id = new mongoose.Types.ObjectId(req.params.id);
        const musica = await Musica.findOne({ _id: id });
        if (musica) {
            next();
        }
        else {
            res.status(404).json({ msg: "Musica nao enontrada" });
        }
    } catch (err) {
        res.status(400).json({ msg: "Id Inválido" });
    }
}

async function obter(req, res) {
    const id = new mongoose.Types.ObjectId(req.params.id);
    const musica = await Musica.findOne({ _id: id });
    res.json(musica);
}

async function atualizar(req, res) {
    const id = new mongoose.Types.ObjectId(req.params.id);
    const musica = await Musica.findOneAndUpdate({ _id: id }, req.body);
    res.json(musica);
}

async function remover(req, res) {
    const id = new mongoose.Types.ObjectId(req.params.id);
    const musica = await Musica.findOneAndDelete({ _id: id });
    res.status(204).end()
}

module.exports = { validar, criar, listarTodos, buscarPeloId, obter, atualizar, remover };


module.exports = { validar, criar };