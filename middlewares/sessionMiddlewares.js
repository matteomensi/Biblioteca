// file: middlewares/sessionMiddlewares.js

function isLoggedIn (req, res, next) {
  if (req.session && req.session.userID) {
    return next();
  } else {
    const target = req.app.locals.error || {};
    Object.assign(target,
      {
        login: {
          msg: 'Area protetta. Per accedere devi eseguire il login',
          isErrorValid: true
        }
      });
    req.app.locals.error = target;
    res.redirect('/utenti/login');
  }
}

module.exports = isLoggedIn;