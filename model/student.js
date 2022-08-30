// file: model/student.js

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
  matricola: Number,
  corso: {
    type: String,
    required: true,
    trim: true
  },
  dataNascita: Date,
});

StudentSchema.index({matricola: -1});

const Student = mongoose.model('studente', StudentSchema);

module.exports = Student;