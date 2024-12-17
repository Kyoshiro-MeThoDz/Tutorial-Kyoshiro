const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Inscription
router.post('/register', async (req, res) => {
    try {
        const userExists = await User.findOne({ username: req.body.username });
        if (userExists) {
            return res.status(400).json({ error: 'Ce pseudo est déjà utilisé' });
        }

        const user = new User(req.body);
        await user.save();

        // Ne pas renvoyer le mot de passe
        const userResponse = { ...user.toObject() };
        delete userResponse.password;

        req.session.userId = user._id;
        res.json({ success: true, user: userResponse });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de l\'inscription' });
    }
});

// Connexion
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(400).json({ error: 'Utilisateur non trouvé' });
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(400).json({ error: 'Mot de passe incorrect' });
        }

        const userResponse = { ...user.toObject() };
        delete userResponse.password;

        req.session.userId = user._id;
        res.json({ success: true, user: userResponse });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la connexion' });
    }
});

// Déconnexion
router.post('/logout', (req, res) => {
    req.session.destroy();
    res.json({ success: true });
});

module.exports = router; 