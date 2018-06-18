const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const users = require('./routes/users.js');

const app = express();

const port = 8080;

mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err) => {
    if (err) {
        console.log('Cloud NOT connect to database: ', err);
    } else {
        console.log('Connected to database: ' + config.db);
    }
});

/* app.use(express.static(__dirname + '/client/dist/')); */

// Cors Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'client')));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

// Home Route
app.get('/', (req, res) => {
    res.send('Hello Word')
    /* res.sendFile(path.join(__dirname + '/client/dist/index.html')); */
});

// Start Server
app.listen(port, () => {
    console.log('Listening on port '+ port);
});