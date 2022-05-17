const axios = require('axios').default
const qs = require('qs');

const requests = [
  {
    method: 'get',
    url: 'contacts'
  },
  {
    method: 'post',
    url: 'contacts',
    newContact: {
      id: '100',
      firstName: 'Alan',
      lastName: 'Turing'
    }
  },
  {
    method: 'post',
    url: 'contacts',
    newContact: {
      id: '101',
      firstName: 'Dermot',
      lastName: 'Turing'
    }
  },
  {
    method: 'get',
    url: 'contacts/100'
  },
  {
    method: 'get',
    url: 'contacts?firstName=Max'
  },
  {
    method: 'get',
    url: 'contacts?lastName=Mustermann'
  },
  {
    method: 'get',
    url: 'contacts?firstName[contains]=r'
  },
  {
    method: 'get',
    url: 'contacts?firstName[contains]=r&lastName[contains]=ring'
  },
  {
    method: 'delete',
    url: 'contacts/1'
  },
  {
    method: 'get',
    url: 'contacts'
  }
]

const baseURL = 'http://localhost:3000/api/v1/'

const startRequests = async function () {
  const instance = axios.create({baseURL: baseURL})
  for(const req of requests){
    await instance({method: req.method, url: req.url, data: req.newContact})
      .then((req) => console.log(JSON.stringify(req.data)))
      .catch((req) => console.log(req.response?.status))
  }
}

startRequests()
