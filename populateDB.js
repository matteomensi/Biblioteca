const db = require('./databaseConfig');
const Student = require('./model/student');
const studenti = require('./model/studenti.json');

async function populateDB () {
  if (db.collections.students) {
    try {
      await Student.remove({});
      await Student.create(studenti);
    } catch (error) {
      console.log(error);
    }
  }
}

populateDB()
  .then(() => db.close())
  .then(() => console.log('connection closed'));