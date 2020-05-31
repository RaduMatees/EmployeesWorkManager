const router = require('express').Router()
const { authenticateToGithub, getTokenFromGithub, getRepositoriesFromGithub } = require('../oAuthProviders/oAuthProviders')

// Github
router.get('/github', async (req, res) => {
  await authenticateToGithub(req, res)
})

router.post('/github-token/:code', async (req, res) => {
  await getTokenFromGithub(req, res, req.params.code)
})

router.get('/github/repositories/:token', async (req, res) => {
  await getRepositoriesFromGithub(req, res, req.params.token)
})

module.exports = router