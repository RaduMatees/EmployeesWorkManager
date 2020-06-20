const axios = require('axios')

const setAuthToken = (instance, token) => {
  if (token) {
    instance.defaults.headers.common['Authorization'] = `token ${token}`
    instance.defaults.headers.common['Content-Type'] = `application/json`
  } else {
    delete instance.defaults.headers.common['Authorization']
  }
}

module.exports = setAuthToken