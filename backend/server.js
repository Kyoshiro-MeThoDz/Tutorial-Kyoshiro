const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');
const cors = require('cors');
const app = express();

// Configuration
app.use(express.json());
app.use(cors());
app.use(session({
    secret: 'votre_clé_secrète',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true }
}));

// Connexion MongoDB
mongoose.connect('mongodb://localhost/ninja_dojo', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}); 