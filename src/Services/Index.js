const axios = require('axios');

function Get(url) {
  return axios
    .get(url)
    .then((response) => response.data)
    .catch((error) => error.response);
}

function Post(url, object) {
  console.log(object);
  return axios({
    method: 'post',
    url: url,
    data: object,
  })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log('the error has occured: ' + error);
    });
}

module.exports = {
  Get,
  Post,
};
