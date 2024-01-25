const { Router } = require('express')
const passport = require('passport')
const { Strategy: FacebookStrategy } = require('passport-facebook')
const jwt = require('jsonwebtoken')
const { models } = require('../../database/connection/database')
const bcrypt = require('bcrypt')
const { backUrl, frontUrl } = require('../../config')

const router = Router()

passport.use(
  new FacebookStrategy(
    {
      clientID: '1093121278029705',
      clientSecret: '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',
      callbackURL: `${backUrl}/api/v1/user/login/facebook`,
      profileFields: ['id', 'displayName', 'email']
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value
        let user = await models.UserModel.findOne({ where: { email } })

        if (!user) {
          const hashedPassword = await bcrypt.hash(profile.id, 10)
          user = await models.UserModel.create({
            userName: profile.displayName,
            email,
            password: hashedPassword
          })
        }
        done(null, user)
      } catch (error) {
        console.error(error)
        done(error)
      }
    }
  )
)

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await models.UserModel.findByPk(id)
    done(null, user)
  } catch (error) {
    done(error, null)
  }
})

router.get('/', passport.authenticate('facebook', { scope: ['email'] }))

router.get(
  '/',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  (req, res) => {
    const { user } = req
    const payload = {
      id: user.id,
      email: user.email
    }
    const token = jwt.sign(payload, 'your-secret-key') // Replace with your actual secret key
    res.redirect(`${frontUrl}/?token=${token}`)
  }
)

module.exports = router
