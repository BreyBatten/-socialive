const express = require('express');
const session = require('express-session');
const knexSessionStore = require('connect-session-knex')(session);
const cors = require('cors');
const helmet = require('helmet');
const secret = require('../config/secret.js');
require('dotenv').config();

const server = express();

server.use(helmet());
server.use(express.json());
server.use(session(sessionOptions));
server.use(cors());

server.get('/', (req, res) => {
    res.send(`<h1>Socialive Back-end</h1>`);
});

module.exports = server;