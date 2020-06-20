const router = require('express').Router()
const { authenticateToGithub, getTokenFromGithub, getRepositoriesFromGithub } = require('../oAuthProviders/oAuthProviders')
const authMiddleware = require('../middleware/authMiddleware')

// Github
router.get('/github/:role', async (req, res) => {
  await authenticateToGithub(req, res, req.params.role)
})

router.post('/github-token/:code', async (req, res) => {
  await getTokenFromGithub(req, res, req.params.code)
})

router.get('/github/repositories/:token', authMiddleware, async (req, res) => {
  await getRepositoriesFromGithub(req, res, req.params.token)
})

module.exports = router