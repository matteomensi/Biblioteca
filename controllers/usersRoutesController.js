// file: controllers/usersRoutesController.js

const User = require('../model/user');
const { sessionName } = require('../configs');

function loginGET (req, res) {
  res.render('login');
};

function loginPOST (req, res, next) {
  if (req.body.username && req.body.password) {
    const userDetails = {...req.body};
    const error = new Error('Utente o password errati');
    error.status = 401;
    User.authenticate(userDetails.username, userDetails.password)
      .then(({user, hashMatch}) => {
        if (hashMatch.then && user) {
          hashMatch.then(result => {
            if (result) {
              req.user = user;
              next();
            } else {
              next(error);
            }
          });
        } else {
          return next(error);
        }
      })
      .catch(reason => next(reason));
  } else {
    const error = new Error('Completa correttamente tutti i campi');
    error.status = 400;
    return next(error);
  }
};

function registerGET (req, res) {
  res.render('register');
};

function registerPOST (req, res, next) {
  if (req.body.username && req.body.password) {
    const userDetails = {...req.body};

    User.create(userDetails)
      .then((user) => {
        req.user = user;
        next();
      })
      .catch((reason) => next(reason));
  } else {
    const error = new Error('Completa correttamente tutti i campi');
    error.status = 400;
    return next(error);
  }
};

function logout (req, res, next) {
  if (req.session) {
    req.session.destroy(function (errore) {
      if (errore) {
        return next(errore);
      } else {
        req.app.locals.user = '';
        res.clearCookie(sessionName);
        return res.redirect('/');
      }
    });
  }
}

module.exports = {
  loginGET,
  loginPOST,
  registerGET,
  registerPOST,
  logout
};