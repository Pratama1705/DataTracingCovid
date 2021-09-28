const fetch = require('node-fetch');

const postDetail = async (req, res) => {
  const { namaProv } = req.body;

  const url = 'https://data.covid19.go.id/public/api/prov.json';
  const options = {
    method: 'GET',
  };

  const response = await fetch(url, options)
    .then((res) => res.json())
    .catch((e) => console.error({ message: 'error ahay', error: e }));

  const url_detail = 'https://apicovid19indonesia-v2.vercel.app/api/indonesia/provinsi/more';
  const options_detail = {
    method: 'GET',
  };
  const response_detail = await fetch(url_detail, options_detail)
    .then((res) => res.json())
    .catch((e) => console.error({ message: 'error ahay', error: e }));

  const provinsi = namaProv.toUpperCase();
  const ketemuProvinsi = response_detail.find((obj) => obj.provinsi == provinsi);

  if (ketemuProvinsi) {
    res.render('../views/DetailProvinsi', {
      message: ketemuProvinsi,
    });
  } else {
    res.render('../views/KasusProvinsi', {
      message: response.list_data,
      messageTidakKetemu: `${namaProv} yang anda cari tidak ditemukan! Coba cari secara manual`,
    });
  }
};

module.exports = postDetail;
