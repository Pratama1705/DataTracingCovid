const fetch = require('node-fetch');

const getDetail = async (req, res) => {
  if (!req.user) {
    res.render('../views/Form_Login', {
      message: 'You must login first!',
    });
    return res;
  }

  const { key } = req.params;

  const url = 'https://apicovid19indonesia-v2.vercel.app/api/indonesia/provinsi/more';
  const options = {
    method: 'GET',
  };
  const response = await fetch(url, options)
    .then((res) => res.json())
    .catch((e) => console.error({ message: 'error ahay', error: e }));

  const provinsi = key.replaceAll('"', '');
  const ketemuProvinsi = response.find((obj) => obj.provinsi == provinsi);

  res.render('../views/DetailProvinsi', {
    message: ketemuProvinsi,
  });
};

module.exports = getDetail;
