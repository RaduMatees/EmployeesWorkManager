const router = require('express').Router()
const { userRegister, userLogin, userAuth, userSerializer, checkRole } = require('../utils/Auth')

// Users Registration
router.post('/register-user', async (req, res) => {
  await userRegister(req.body, 'employee', res)
})

// Admin registration
router.post('/register-admin', async (req, res) => {
  await userRegister(req.body, 'admin', res)
})

// Users Login
router.post('/login-user', async (req, res) => {
  await userLogin(req.body, 'employee', res)
})

// Admin Login
router.post('/login-admin', async (req, res) => {
  await userLogin(req.body, 'admin', res)
})

// Profile route
router.get('/profile', userAuth, async (req, res) => {
  return res.json(userSerializer(req.user))
})

// Users Protected
router.get('/user-protected', userAuth, checkRole(['employee']), async (req, res) => {
  return res.json('Hello employee')
})

// Admin Protected
router.get('/admin-protected', userAuth, checkRole(['admin']), async (req, res) => {
  return res.json('Hello admin')
})

module.exports = router