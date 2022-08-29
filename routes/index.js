// file: routes/index.js

const express = require('express');
const isLoggedIn = require('../middlewares/sessionMiddlewares');
const router = express.Router();

function indexRoutes (controller) {
  // Valida per il percorso /   
  router.get('/', controller.indexPage);

  // Valida per il percorso /studenti
  router.get('/studenti', controller.studentsPage);

  // Usata per scaricare il file .json originale
  router.get('/studenti.json', isLoggedIn, controller.studentsFile);

  // Valida per il percorso /studenti
  router.route('/nuova-prenotazione')
    .all(isLoggedIn)
    .get(controller.newStudentGET)
    .post(controller.newStudentPOST);

  return router;
};

module.exports = indexRoutes;