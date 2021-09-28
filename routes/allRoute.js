const express = require('express');
const router = express.Router();

// Path first page
router.get('/', (req, res) => {
  res.render('../views/Home');
});

// Path registrasi
router.get('/register', (req, res) => {
  res.render('../views/Form_Registrasi');
});
const postRegistrasi = require('../controller/postRegistrasi');
router.post('/register', postRegistrasi);

// Path login
router.get('/login', (req, res) => {
  res.render('../views/Form_Login');
});
const postLogin = require('../controller/postLogin');
router.post('/login', postLogin);

// Path restricted
const getRestricted = require('../controller/getRestricted');
const cekCookie = require('../middleware/cekCookie');
router.get('/restricted', cekCookie, getRestricted);

// Path data per provinsi
const getDataProv = require('../controller/getDataProv');
router.get('/dataProv', cekCookie, getDataProv);

// Path cari provinsi
const cariProvinsi = require('../controller/postDetail');
router.post('/detail', cariProvinsi);

// Path detail provinsi
const getDetailProv = require('../controller/getDetailProv');
router.get('/detail/:key', cekCookie, getDetailProv);

// Path logout
const logout = require('../controller/getLogout');
router.get('/logout', cekCookie, logout);

module.exports = router;
