const axios = require('axios')
const setAuthToken = require('./setAuthToken')

const authenticateToGithub = async (req, res) => {
  console.log('authenticateToGithub')
  try {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}`)
  } catch (err) {
    console.error('Error authenticating to Github OAuth Provider')
  }
}

const getTokenFromGithub = async (req, res, code) => {
  const params = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    code
  }

  try {
    const response = await axios.post('https://github.com/login/oauth/access_token', params)
    return res.json({
      status: 200,
      success: true,
      token: response.data
    })
  } catch (err) {
    console.error('Error getting the auth token from Github, ', err)
  }
}

const getRepositoriesFromGithub = async (req, res, token) => {
  try {
    token = token.substring(token.indexOf('=') + 1, token.indexOf('&scope'))
    setAuthToken(token)
    const response = await axios.get('https://api.github.com/user')
    console.log('REPONSE', response.data)
    return res.json({
      status: 200,
      success: true,
      organizations: response.data
    })
  } catch (err) {
    console.error('Error trying to fetch repositories, ', err)
  }
}

module.exports = { authenticateToGithub, getTokenFromGithub, getRepositoriesFromGithub }