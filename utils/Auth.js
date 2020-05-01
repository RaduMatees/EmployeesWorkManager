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
    return res.status(201).json({
      message: 'User created succesfully',
      success: true
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
  if (isMatch) {
    let token = jwt.sign({
      user_id: user._id,
      role: user.role,
      email: user.email,
    }, SECRET, { expiresIn: "7 days" })

    let result = {
      name: user.name,
      role: user.role,
      email: user.email,
      token: `Bearer ${token}`,
      expiresIn: 168
    }

    return res.status(200).json({
      ...result,
      message: "User logged in succesfully",
      success: true
    })
  } else {
    return res.status(403).json({
      message: 'Invalid credentials',
      success: false
    })
  }
}

const validateUsername = async (username) => {
  let user = await User.findOne({ username })
  return user ? true : false
}

const validateEmail = async (email) => {
  let user = await User.findOne({ email })
  return user ? true : false
}

// @Desc Passport Middleware
const userAuth = passport.authenticate('jwt', { session: false })

// @Desc Check Role Middleware
const checkRole = (roles) => (req, res, next) => {
  if (roles.includes(req.user.role)) {
    return next()
  } else {
    res.status(401).json({
      message: 'Unauthorized',
      success: false
    })
  }
}

// @Desc Serialize User
const userSerializer = (user) => {
  return {
    _id: user._id,
    name: user.name,
    username: user.username,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  }
}

module.exports = {
  checkRole,
  userRegister,
  userLogin,
  userAuth,
  userSerializer
}