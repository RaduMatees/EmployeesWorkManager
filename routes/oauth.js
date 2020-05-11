const router = require('express').Router()
const { authenticateToGithub, authenticateToGithubCallback, getTokenFromGithub } = require('../oAuthProviders/oAuthProviders')

// Github
router.get('/github', async (req, res) => {
  await authenticateToGithub(req, res)
})

router.post('/github-token/:code', async (req, res) => {
  await getTokenFromGithub(req, res, req.params.code)
})

router.post('/github-callback', async (req, res) => {
  await authenticateToGithubCallback(req, res)
})

module.exports = router