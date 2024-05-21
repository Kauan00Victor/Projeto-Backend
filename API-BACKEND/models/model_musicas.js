const mongoose = require('mongoose');

const musicaSchema = new mongoose.Schema({
    cantor: {type: String, trim: true, uppercase: true, required: true},
    nome: {type: String, require: true, trim: true},
})

module.exports = mongoose.model("Musicas", musicaSchema)