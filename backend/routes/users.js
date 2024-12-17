const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Middleware d'authentification
const auth = (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({ error: 'Non autorisé' });
    }
    next();
};

// Liste des utilisateurs
router.get('/', auth, async (req, res) => {
    try {
        const users = await User.find({}, '-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
    }
});

module.exports = router; 