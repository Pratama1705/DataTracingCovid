const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Registrasi_Login = require('../models/login_regis');

const login = async (req, res) => {
  const { email, password } = req.body;

  // Check empty body request
  if (email === '' || password === '') {
    res.render('../views/Form_Login', {
      message: 'Cannot allowed empty field!',
    });
    res.status(400);
    return res;
  }

  // Check email exist
  const cekDB = await Registrasi_Login.findOne({ email });
  if (!cekDB) {
    res.render('../views/Form_Login', {
      message: 'Email doesnt exist!!',
    });
    res.status(400);
    return res;
  }

  // Check password match
  const isMatch = await bcrypt.compare(password, cekDB.password);
  if (!isMatch) {
    res.render('../views/Form_Login', {
      message: 'Password didnt match!',
    });
    res.status(400);
    return res;
  }

  // Generate token
  const authTokens = {};
  const token = jwt.sign({ id: cekDB._id }, process.env.SECRET_KEY);
  authTokens[token] = cekDB;
  res.cookie('jwt', token, {
    httpOnly: true,
    maxAge: 2 * 60 * 60 * 1000,
  });

  // Redirect to page
  res.redirect('/restricted');
  return res.status(200);
};
module.exports = login;
