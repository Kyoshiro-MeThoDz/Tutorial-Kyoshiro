const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    lastName: String,
    firstName: String,
    level: Number,
    mainClass: String,
    guild: String,
    platform: String,
    username: { type: String, unique: true },
    password: String,
    createdAt: { type: Date, default: Date.now }
});

// Hash du mot de passe avant sauvegarde
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

module.exports = mongoose.model('User', userSchema); 