const mongoose = require('mongoose');

const loginRegisSchema = mongoose.Schema({
  email: String,
  firstName: String,
  lastName: String,
  password: String,
});

module.exports = mongoose.model('Registrasi_Login', loginRegisSchema);
