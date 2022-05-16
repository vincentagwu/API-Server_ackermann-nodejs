const axios = require('axios').default;

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

  function axiosGet(){
    requests.forEach(request => {
      if(request.method === 'get'){
        axios.get(baseURL + request.url).then(function (response) {
          // handle success
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
      }
    })
  }

  let count = 0;

  function generalAxios(){

    // for (const request of requests) {
    //   request.method === 'get' ?
    //   (axios.get(baseURL + request.url).then(function (response) {
    //     console.log(JSON.stringify(response.data));
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   }))
    //   :
    //   request.method === 'post' ?
    //     (axios.post(baseURL + request.url, request.newContact).then(function (response) {
    //       console.log(JSON.stringify(response.data));
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     }))
    //     :
    //     request.method === 'delete' ?
    //     (axios.delete(baseURL + request.url).then(function (response) {
    //     console.log(response.data);
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     }))
    //   :
    //     console.log('Invalid method!')
    // }


    requests.forEach(request => {
      // if(request.newContact == null)
      //   console.log('request: ' + request + ', method: ' + request.method + ', url: ' + request.url)
      // else 
      //   console.log('request: ' + request + ', method: ' + request.method + ', url: ' + request.url + ', newContact: ' + request.newContact)
      request.method === 'get' ?
      (axios.get(baseURL + request.url).then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      }))
      :
      request.method === 'post' ?
        (axios.post(baseURL + request.url, request.newContact).then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        }))
        :
        request.method === 'delete' ?
        (axios.delete(baseURL + request.url).then(function (response) {
        console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        }))
      :
      (
        console.log('Invalid method!')
      )
    })
  }

  function axiosPost(){
    requests.forEach(request => {
      if(request.method === 'post'){
        axios.post(baseURL + request.url, request.newContact).then(function (response) {
          // handle success
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        })
      }
    })
  }

  function axiosDelete(){
    requests.forEach(request => {
      if(request.method === 'delete'){
        axios.delete(baseURL + request.url).then(function (response) {
          // handle success
          console.log(response.data);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
      }
    })
  }

  generalAxios()
  // axiosPost()
  // axiosDelete()
  // axiosGet()


