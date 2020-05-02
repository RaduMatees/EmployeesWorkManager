const bcrypt = require('bcryptjs')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { SECRET } = require('../config/index')
const passport = require('passport')

// @desc Register the user (employee, admin)
const userRegister = async (userData, role, res) => {
  const { email, name, password } = userData

  try {
    // Validate email
    let emailExists = await validateEmail(email)
    if (emailExists) {
      return res.status(400).json({
        message: 'Email is already registered',
        success: false
      })
    }

    const hashedPass = await bcrypt.hash(password, 12)
    const newUser = new User({
      name,
      email,
      role,
      password: hashedPass
    })
    await newUser.save()

    const payload = {
      user: {
        id: newUser.id,
        role: newUser.role
      }
    }
    jwt.sign(payload, SECRET, { expiresIn: 3600 }, (err, token) => {
      if (err) throw err
      return res.json({
        success: true,
        message: 'Successfully registered the user',
        token
      })
    })

  } catch (err) {
    return res.status(500).json({
      message: 'Error creating the account',
      success: false
    })
  }
}

// @desc Login the user (employee, admin)
const userLogin = async (userData, role, res) => {
  let { email, password } = userData
  // check if user exists
  const user = await User.findOne({ email })

  if (!user) {
    return res.status(404).json({
      message: 'Invalid credentials',
      success: false
    })
  }
  // check role
  if (user.role !== role) {
    return res.status(403).json({
      message: 'Please make sure you are logging from the right portal',
      success: false
    })
  }

  let isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) return res.status(403).json({
    message: 'Invalid credentials',
    success: false
  })

  const payload = {
    user: {
      id: user.id,
      role: user.role
    }
  }
  jwt.sign(payload, SECRET, { expiresIn: 3600 }, (err, token) => {
    if (err) throw err
    return res.json({ token })
  })

}

const returnUser = async (reqUser, res) => {
  try {
    const user = await User.findById(reqUser.id).select('-password')
    return res.json(user)
  } catch (err) {
    console.error('Error finding user by id, ', err.message)
    return res.status(500).send('Server Error')
  }
}

const validateEmail = async (email) => {
  const user = await User.findOne({ email })
  return user ? true : false
}

// @Desc Check Role Middleware
const checkRole = (roles) => (req, res, next) => {
  if (roles.includes(req.user.role)) {
    return next()
  } else {
    return res.status(401).json({
      message: 'Unauthorized',
      success: false
    })
  }
}

module.exports = {
  checkRole,
  userRegister,
  userLogin,
  returnUser
}