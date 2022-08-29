// file: middlewares/configAuthMiddleware.js

const login = require('../helpers/login');

function configErrorAuthMiddleware (page, errorMessage) {
  return function errorLoginMiddleware (error, req, res, next) {
    console.log(error);
    const target = res.locals.error || {};
    Object.assign(target,
      {
        [page]: {
          msg: errorMessage || error.message,
          isErrorValid: true
        }
      });
    res.locals.error = target;

    res.status(400).render(page);
  };
}

function configAuthMiddleware (redirect) {
  return function authMiddleware (req, res, next) {
    req.app.locals.error = {};
    req.app.locals.user = req.user.username;
    login(req)
      .then(user => res.redirect(redirect))
      .catch(reason => next(reason));
  };
}

module.exports = {configErrorAuthMiddleware, configAuthMiddleware};