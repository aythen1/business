const { Router } = require('express')
const passport = require('passport')
const { Strategy: GoogleStrategy } = require('passport-google-oauth20')
const jwt = require('jsonwebtoken')
const { models } = require('../../database/connection/database')
const bcrypt = require('bcrypt')
const { backUrl, frontUrl, isSecure } = require('../../config')
const cookie = require('cookie')

const router = Router()

passport.use(
  new GoogleStrategy(
    {
      clientID:
        '310573099885-f32b2kiislasnqa13tc9sca4tb9389kr.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: `${backUrl}/api/v1/user/login/google`
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

router.get(
  '/',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)
router.get('/', (req, res) => {
  const { user } = req
  const payload = {
    id: user.id,
    userName: user.userName,
    email: user.email,
    plan: user.plan,
    isVerified: user.isVerified,
    isFreelancer: user.isFreelancer
  }
  const token = jwt.sign(
    payload,
    'keySecret156754asdas897fav45646xz4c65z899sa4fa654fas65f4sa65sadasf'
  )
  console.log(token, isSecure, 'token back')
  // Establecer la cookie

  res.setHeader(
    'Set-Cookie',
    cookie.serialize('auth', token, {
      secure: isSecure, // siempre usar HTTP, si queres usar HTTPS true
      maxAge: 3600, // 1 hora
      path: '/'
    })
  )

  // Redirigir sin el token en la URL
  res.redirect(`${frontUrl}/workspace/${user.id}`)
})

module.exports = router
