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
            req.musica = musica; 
            next();
        } else {
            res.status(404).json({ msg: "Música não encontrada" });
        }
    } catch (err) {
        res.status(400).json({ msg: "ID inválido" });
    }
}

async function obter(req, res) {
    const id = new mongoose.Types.ObjectId(req.params.id);
    const musica = await Musica.findOne({ _id: id });
    res.json(musica);
}

async function atualizar(req, res) {
    try {
        const id = new mongoose.Types.ObjectId(req.params.id);
        const musica = await Musica.findOneAndUpdate({ _id: id }, req.body, { new: true });
        if (musica) {
            res.json(musica);
        } else {
            res.status(404).json({ msg: "Música não encontrada" });
        }
    } catch (err) {
        res.status(422).json({ msg: "Erro ao atualizar a música" });
    }
}

async function remover(req, res) {
    try {
        const id = new mongoose.Types.ObjectId(req.params.id);
        const musica = await Musica.findOneAndDelete({ _id: id });
        if (musica) {
            res.status(204).end();
        } else {
            res.status(404).json({ msg: "Música não encontrada" });
        }
    } catch (err) {
        res.status(422).json({ msg: "Erro ao remover a música" });
    }
}

module.exports = { validar, criar, listarTodos, buscarPeloId, obter, atualizar, remover };

