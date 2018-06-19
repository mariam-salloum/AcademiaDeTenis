const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');

router.post('/register', (req, res, next) => {
    //res.send('Register');
    let newUser = User({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        cedula: req.body.cedula,
        f_nacimiento: req.body.f_nacimiento,
        email: req.body.email,
        password: req.body.password,
        telefono: req.body.telefono
    });

    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to register User' });
        } else {
            res.json({ success: true, msg: 'User registered' });
        }
    });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
    //res.send('Authenticate');
    const email = req.body.email;
    const password = req.body.password;

    // Comprobamos el email
    User.getUserByEmail(email, (err, user) => {
        if(err) throw err;
        if (!user) {
            return res.json({success: false, msg: 'User not found'});
        }

        // si existe, comprobamos la contrase;a recien escrita con la que esta guardada en la bd
        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch) {
                const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 604800 // 1 semana
                });
                
                res.json({
                    success: true,
                    token: 'JWT '+token,
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email
                    }
                })
            } else {
                return res.json({success: false, msg: 'Wrong Password'});
            }
        });
    });
});

// Profile -> PROTECT WITH TOKEN (passport.authenticate('jwt, {session:false}'))
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    //res.send('Profile');
    res.json({user: req.user});
});

module.exports = router;