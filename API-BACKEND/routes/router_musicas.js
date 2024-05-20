const express = require('express');

const router = express.Router();

router.post("/musicas", (req, res) => {
    res.status(201).json({"cantor": "Drake", "musica": "God's Plan"})
})

module.exports = router;