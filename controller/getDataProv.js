const fetch = require('node-fetch');

const dataProv = async (req, res) => {
  if (!req.user) {
    res.render('../views/Form_Login', {
      message: 'You must login first!',
    });
    return res;
  }

  const url = 'https://data.covid19.go.id/public/api/prov.json';
  const options = {
    method: 'GET',
  };

  const response = await fetch(url, options)
    .then((res) => res.json())
    .catch((e) => console.error({ message: 'error ahay', error: e }));

  res.render('../views/KasusProvinsi', {
    message: response.list_data,
  });
};

module.exports = dataProv;
