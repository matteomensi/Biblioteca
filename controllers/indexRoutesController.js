// file: controllers/indexRoutesController.js

const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const moment = require('moment');
const formatNumber = require('format-number');
const Student = require('../model/student');

const writeFileAsync = promisify(fs.writeFile);

const customNumberFormat = formatNumber({
  prefix: '€',
  integerSeparator: '.',
  decimal: ','
});

// Controller per la homepage
function indexPage (req, res) {
  res.render('index');
}

// Controller per la lista dei studenti (percorso /studenti)
function studentsPage (req, res, next) {
  Student.find({}, '-_id')
    .sort({'matricola': -1})
    .exec()
    .then((studenti) => {
      res.render('studenti', {studenti, moment, customNumberFormat});
    })
    .catch(error => {
      next(error);
    });
}

// Controller per GET requests /nuova-prenotazione
function newStudentGET (req, res) {
  res.render('nuova-prenotazione');
}

// Controller per POST requests /nuova-prenotazione
function newStudentPOST (req, res, next) {
  const separator = /\s*-\s*/;
  const filePath = path.join(__dirname, '../model', 'studenti.json');

  if (!req.body) return res.sendStatus(400);

  let student = req.body;

  student.dataNascita = new Date(student.dataNascita);
  student = new Student(student);

  student.save()
    .then((student) => {
      return Student.find({}, '-_id -__v')
        .sort({'matricola': -1})
        .exec();
    })
    .then((studenti) => {
      return writeFileAsync(filePath, JSON.stringify(studenti, null, 2));
    })
    .then(() => res.redirect('/studenti'))
    .catch(error => next(error));
}

// avvia il download del file studenti.json
function studentsFile (req, res, next) {
  const filePath = path.join(__dirname, '../model', 'studenti.json');
  // se il file esiste, invialo al client
  fs.access(filePath, fs.constants.F_OK, (error) => {
    if (error) {
      // passa l'errore al middleware 'error handler' in app.js
      next(error);
    }
    res.download(filePath, 'studenti.json');
  });
}

module.exports = {
  indexPage,
  studentsPage,
  newStudentGET,
  newStudentPOST,
  studentsFile
};