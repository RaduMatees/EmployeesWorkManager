const axios = require('axios')
const { setAuthToken } = require('./axiosInstance')

const authenticateToGithub = async (req, res, role) => {
  try {
    // const scope = role === 'admin' ? 'repo' : 'user'
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=repo`)
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

    let token = response.data
    token = token.substring(token.indexOf('=') + 1, token.indexOf('&scope'))
    setAuthToken(token)

    return res.json({
      status: 200,
      success: true,
      token
    })
  } catch (err) {
    console.error('Error getting the auth token from Github, ', err)
  }
}

module.exports = { authenticateToGithub, getTokenFromGithub }