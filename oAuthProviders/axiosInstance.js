const axios = require('axios')

const axiosInstance = axios.create({
  baseURL: 'https://api.github.com'
})

const setAuthToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `token ${token}`
    axiosInstance.defaults.headers.common['Content-Type'] = `application/json`
  } else {
    delete axiosInstance.defaults.headers.common['Authorization']
  }
}

module.exports = { axiosInstance, setAuthToken }