const axios = require('axios');

const options = {
  method: 'POST',
  url: 'http://localhost:8000/api/v1/users/login',
  headers: {'content-type': 'application/json'},
  data: {username: 'koushik', email: 'kous345345354hik@gmail.com', password: '"232323"'}
};

async function run(){
    try {
      const { data } = await axios.request(options);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
}
run();