const jwt_decode = require('jwt-decode');
const fetch = require('node-fetch');
const Registrasi_Login = require('../models/login_regis');

const restricted = async (req, res) => {
  if (!req.user) {
    res.render('../views/Form_Login', {
      message: 'You must login first!',
    });
    return res;
  }

  // User firstname
  const token = req.user;
  const decoded = jwt_decode(token);
  const namaUser = await Registrasi_Login.findOne({ _id: decoded.id });

  // API kasus covid
  const url = 'http://apicovid19indonesia-v2.vercel.app/api/indonesia/harian';
  const options = {
    method: 'GET',
  };
  const response = await fetch(url, options)
    .then((res) => res.json())
    .catch((e) => console.error({ message: 'error ahay', error: e }));

  // API vaksin covid
  const url_2 = 'https://vaksincovid19-api.now.sh/api/vaksin';
  const options_2 = {
    method: 'GET',
  };
  const response_2 = await fetch(url_2, options_2)
    .then((res) => res.json())
    .catch((e) => console.error({ message: 'error ahay', error: e }));

  // Tanggal
  var months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  var myDays = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  var date = new Date();
  var day = date.getDate();
  var month = date.getMonth();
  var thisDay = date.getDay(),
    thisDay = myDays[thisDay];
  var yy = date.getYear();
  var year = yy < 1000 ? yy + 1900 : yy;
  var today = thisDay + ', ' + day + ' ' + months[month] + ' ' + year;

  res.render('../views/Restricted', {
    message: `Welcome ${namaUser.firstName}`,
    dataKum: response[response.length - 1],
    dataVak: response_2,
    tanggal: today,
  });
};

module.exports = restricted;
