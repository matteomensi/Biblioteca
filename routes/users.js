// file routes/users.js

const express = require('express');
const router = express.Router();

const configClearErrorMiddleware =
  require('../middlewares/configClearErrorMiddleware');

const {
  configErrorAuthMiddleware,
  configAuthMiddleware
} = require('../middlewares/configAuthMiddleware');

function usersRoutes (controller) {
  // Valida per il percorso /utenti/login   
  router.route('/login')
    .get(configClearErrorMiddleware('login'), controller.loginGET)
    .post(
      controller.loginPOST,
      configErrorAuthMiddleware('login'),
      configAuthMiddleware('/nuova-prenotazione')
    );

  // Valida per il percorso /utenti/registrati
  router.route('/registrati')
    .get(configClearErrorMiddleware('register'), controller.registerGET)
    .post(
      controller.registerPOST,
      configErrorAuthMiddleware(
        'register',
        'Impossibile eseguire la registrazione'),
      configAuthMiddleware('/nuova-prenotazione')
    );

  // Valida per /utenti/logout
  router.get('/logout', controller.logout);

  return router;
};

module.exports = usersRoutes;