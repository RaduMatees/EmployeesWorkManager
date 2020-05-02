const router = require('express').Router()
const { userRegister, userLogin, checkRole, returnUser } = require('../utils/Auth')
const authMiddleware = require('../middleware/authMiddleware')

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