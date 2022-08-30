// file: app.js

const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const favicon = require('serve-favicon');
//const db = require('./databaseConfig');
const mongoose = require('mongoose');
const configs = require('./configs.js');
const { sessionSecret, sessionName } = require('./configs');
const indexRoutesController = require('./controllers/indexRoutesController');
const usersRoutesController = require('./controllers/usersRoutesController');

const user = configs.dbUser;
const password = configs.password;

//const indirizzo = 'mongodb+srv://${user}:${password}@cluster0.6gv9onf.mongodb.net/?retryWrites=true&w=majority';
const indirizzo = `mongodb+srv://${user}:${password}@cluster0.6gv9onf.mongodb.net/?retryWrites=true&w=majority`;

const app = express();

const PORT = 7777 || process.env.PORT;

const server = http.createServer(app);

// importa i router per i diversi percorsi
const indexRoutes = require('./routes/index')(indexRoutesController);
const usersRoutes = require('./routes/users')(usersRoutesController);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// set favicon
app.use(favicon(path.join(__dirname, 'public', 'biblioteca.ico')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// parse cookies
app.use(cookieParser());

//databaseconfig
/*mongoose.Promise = Promise;
mongoose.connect(indirizzo, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', (error) => console.log('Errore connessione' + error));*/

app.use(session({
  secret: sessionSecret,
  resave: false,
  name: sessionName,
  saveUninitialized: false,
  store: MongoStore.create({
    //mongooseConnection: db
    //client: mongoose.connection.getClient()
    mongoUrl: indirizzo
    //touchAfter: 24 * 3600
  })
}));

// static assets
app.use('/static', express.static(path.join(__dirname, 'public')));

// percorsi dell'applicazione
app.use('/', indexRoutes);
app.use('/utenti', usersRoutes);

// intercetta l'errore 404 e lo manda all'error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

server.listen(PORT, function () {
  const host = server.address().address;
  const port = server.address().port;
  const address = `http://${host}:${port}`;
  console.log(`Server in ascolto all'indirizzo: ${address}`);
});
