const router = require('express').Router()
const { authenticateToGithub, getTokenFromGithub } = require('../oAuthProviders/oAuthProviders')
const { getRepositoriesFromGithub, getMembersFromGithub } = require('../oAuthProviders/githubApis')
const authMiddleware = require('../middleware/authMiddleware')
const { checkRole } = require('../utils/Auth')

// Github
router.get('/github/:role', async (req, res) => {
  await authenticateToGithub(req, res, req.params.role)
})

router.post('/github-token/:code', async (req, res) => {
  await getTokenFromGithub(req, res, req.params.code)
})

router.get('/github/repositories/:token', authMiddleware, async (req, res) => {
  await getRepositoriesFromGithub(req, res)
})

router.get('/github/members/:token', authMiddleware, async (req, res) => {
  await getMembersFromGithub(req, res)
})

module.exports = router