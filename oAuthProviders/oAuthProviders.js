const axios = require('axios')

const authenticateToGithubCallback = async (req, res) => {
  console.log('callbackkkkkkkkkkkkkkkkkkkkkk')
  try {
    const { query } = req
    const { code } = code

    if (!code) return res.send({
      success: false,
      message: 'Error, no code at github authentication'
    })

    console.log('code', code)
    return code
  } catch (err) {
    console.error('Error authenticating to Github OAuth Porvider', err)
  }
}

const authenticateToGithub = async (req, res) => {
  console.log('authenticateToGithub')
  try {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}`)
  } catch (err) {
    console.error('Error authenticating to Github OAuth Provider')
  }
}

const getTokenFromGithub = async (req, res, code) => {
  console.log('getTokenFromGithub', code)
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

module.exports = { authenticateToGithub, authenticateToGithubCallback, getTokenFromGithub }