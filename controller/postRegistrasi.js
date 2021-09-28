const bcrypt = require('bcrypt');
const Registrasi_Login = require('../models/login_regis');

const registrasi = async (req, res) => {
  const { email, firstName, lastName, password } = req.body;

  //   Check empty body request
  if (email === '' || firstName === '' || lastName === '' || password === '') {
    res.render('../views/Form_Registrasi', {
      message: 'Cannot allowed empty field!',
    });
    res.status(400);
    return res;
  }

  //   Check exist email in database
  const cekDB = await Registrasi_Login.findOne({ email });
  if (cekDB) {
    res.render('../views/Form_Registrasi', {
      message: 'Email already used!',
    });
    res.status(400);
    return res;
  }

  // Hash user password to DB
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  // Store data to DB
  const registrasi = await new Registrasi_Login({
    email: email,
    firstName: firstName,
    lastName: lastName,
    password: hashPassword,
  });

  registrasi
    .save()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => console.log(err));

  res.render('../views/Form_Login');
};

module.exports = registrasi;
