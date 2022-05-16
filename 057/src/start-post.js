const superagent = require('superagent')

const axios = require('./axios-client')

axios.axiosPost()
axios.axiosDelete()

const body = {
  id: '4',
  firstName: 'Petra',
  lastName: 'Mustermann'
}

superagent
  .post('http://localhost:3000/api/v1/contacts')
  .send(body)
  .then((response) => {
    console.log(response.body)
  })
