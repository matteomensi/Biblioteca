const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
});

UserSchema.pre('save', function (next) {
  bcrypt.hash(this.password, SALT_ROUNDS)
    .then((hash) => {
      this.password = hash;
      next();
    })
    .catch((reason) => next(reason));
});

UserSchema.statics.authenticate = function (username, password) {
  return User
    .findOne({ username })
    .exec()
    .then(user => {
      if (user) {
        const hashMatch = bcrypt.compare(password, user.password);
        return {user, hashMatch};
      }
      return {user: null, hashMatch: false};
    });
};

const User = mongoose.model('User', UserSchema);

module.exports = User;