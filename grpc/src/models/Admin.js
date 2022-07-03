const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const AdminSchema = new mongoose.Schema({
    email: String,
    username: String,
    password: String,
});

AdminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) next();

    this.password = await bcrypt.hash(this.password, 8);
});

AdminSchema.methods = {
    compareHash(hash) {
        return bcrypt.compare(hash, this.password);
    },
};

AdminSchema.statics = {
    generateToken({ id }) {
        return jwt.sign({ id }, 'flaviozno', {
            expiresIn: '7d',
        });
    },
};

module.exports = mongoose.model('Admin', AdminSchema);