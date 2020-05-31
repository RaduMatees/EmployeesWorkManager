const router = require('express').Router()
const { userRegister, userLogin, checkRole, returnUser } = require('../utils/Auth')
const authMiddleware = require('../middleware/authMiddleware')
const User = require('../models/User')

// Test Auth
router.get('/', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    const sentUser = { name: user.name, email: user.email, role: user.role }
    res.json(sentUser)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// Users Registration
router.post('/register-employee', async (req, res) => {
  await userRegister(req.body, 'employee', res)
})

// Admin registration
router.post('/register-admin', async (req, res) => {
  await userRegister(req.body, 'admin', res)
})

// Users Login
router.post('/login-employee', async (req, res) => {
  await userLogin(req.body, 'employee', res)
})

// Admin Login
router.post('/login-admin', async (req, res) => {
  await userLogin(req.body, 'admin', res)
})

// Users Protected
router.get('/employee-protected', authMiddleware, checkRole(['employee']), async (req, res) => {
  await returnUser(req.user, res)
})

// Admin Protected
router.get('/admin-protected', authMiddleware, checkRole(['admin']), async (req, res) => {
  await returnUser(req.user, res)
})

module.exports = router