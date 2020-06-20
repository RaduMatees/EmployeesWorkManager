const axios = require('axios')
const setAuthToken = require('./setAuthToken')
const { returnUser } = require('../utils/Auth')

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
  token = token.substring(token.indexOf('=') + 1, token.indexOf('&scope'))
  setAuthToken(token)

  try {
    const response = await axios.get(`https://api.github.com/orgs/${process.env.ORGANIZATION}/repos`)
    const repos = response.data.map(repo => repo.name)
    console.log('repos', repos)
  } catch (err) {
    console.error('Error trying to fetch repositories, ', err)
  }

  // const user = await returnUser(req.user)
  // console.log('user', user)

  // Get Collaborators
  console.log('token', axios.defaults.headers.common)
  const collaborators = await axios.get(`https://api.github.com/repos/BigTechEnterprise/Project1-Frontend/collaborators`)
  console.log('collaborators', collaborators)

  if (req.user.role === 'admin') {
    // Fetch all employees and repositories
  } else {

  }
}

module.exports = { authenticateToGithub, getTokenFromGithub, getRepositoriesFromGithub }