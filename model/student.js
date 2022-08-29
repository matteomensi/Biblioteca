// file: model/students.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  nome: {
    type: String,
    required: true,
    trim: true
  },
  cognome: {
    type: String,
    required: true,
    trim: true
  },
  dataNascita: Date,
  matricola: Number
});

StudentSchema.index({matricola: -1});

const Studente = mongoose.model('studente', StudentSchema);

module.exports = Studente;