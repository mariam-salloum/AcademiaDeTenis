const moongose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('../config/database');

// User Schema
const UserSchema = moongose.Schema({
    nombre: { 
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    cedula: {
        type: String,
        //unique: true,
        required: true
    },
    f_nacimiento: {
        type: String,
        required: true
    },
    email: { 
        type: String,
        //unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    }
});

const User = module.exports = moongose.model('User', UserSchema);

module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
}

module.exports.getUserByEmail = function(email, callback) {
    const query = { email: email };
    User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    });
}