const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/model_users');

const cifrarSenha = (senha, salto) => {
    const hash = crypto.createHmac('sha256', salto);
    hash.update(senha);
    return hash.digest('hex');
};

const criar = async (req, res) => {
    try {
        const salto = crypto.randomBytes(16).toString('hex');
        const senhaCifrada = cifrarSenha(req.body.senha, salto);

        const novoUsuario = await Usuario.create({
            email: req.body.email,
            senha: senhaCifrada,
            salto
        });

        res.status(201).json({
            id: novoUsuario._id.toString(),
            email: novoUsuario.email,
        });
    } catch (err) {
        res.status(500).json({ msg: 'Erro ao criar usuário', error: err.message });
    }
};

const entrar = async (req, res) => {
    try {
        const usuarioEncontrado = await Usuario.findOne({ email: req.body.email });
        if (usuarioEncontrado) {
            const senhaCifrada = cifrarSenha(req.body.senha, usuarioEncontrado.salto);
            if (usuarioEncontrado.senha === senhaCifrada) {
                const token = jwt.sign({ email: usuarioEncontrado.email }, process.env.SEGREDO, { expiresIn: '2m' });
                res.json({ token });
            } else {
                res.status(401).json({ msg: 'Acesso negado!' });
            }
        } else {
            res.status(400).json({ msg: 'Credenciais inválidas!' });
        }
    } catch (err) {
        res.status(500).json({ msg: 'Erro ao fazer login', error: err.message });
    }
};

const renovar = (req, res) => {
    const token = req.headers['authorization'];
    if (token) {
        try {
            const payload = jwt.verify(token, process.env.SEGREDO);
            const novoToken = jwt.sign({ email: payload.email }, process.env.SEGREDO, { expiresIn: '2m' });
            res.json({ token: novoToken });
        } catch (e) {
            res.status(401).json({ msg: 'Token inválido' });
        }
    } else {
        res.status(400).json({ msg: 'Token não enviado' });
    }
};

module.exports = { criar, entrar, renovar };
