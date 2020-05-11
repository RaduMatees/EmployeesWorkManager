require('dotenv').config()

module.exports = {
  SECRET: process.env.APP_SECRET,
  DB: process.env.APP_DB,
  PORT: process.env.APP_PORT,
  BASE_URL: process.env.APP_BASE_URL,
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET
}