const mongoose = require('mongoose');
const configs = require('./configs');

const user = configs.dbUser;
const password = configs.password;

const address = `mongodb+srv://${user}:${password}@cluster0.6gv9onf.mongodb.net/?retryWrites=true&w=majority`;

mongoose.Promise = Promise;

mongoose.connect(address, { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', (error) => console.log('Errore connessione' + error));

module.exports = db;