// file: helpers/login.js

function login (req) {
  return new Promise((resolve, reject) => {
    req.session.regenerate((error) => {
      if (error) {
        reject(error);
      } else {
        console.log('regenerating session...');
        req.session.userID = req.user._id;
        resolve(req.user);
      }
    });
  });
}

module.exports = login;