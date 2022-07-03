const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    id: Number,
    email: String,
    username: String,
    password: String,
});

AdminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) next();

    this.password = await bcrypt.hash(this.password, 8);
});

module.exports = mongoose.model('Admin', AdminSchema);