const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')
const {ActiveSession, User} = require('../models')

const tokenExtractor = async(req, res, next) => {
  const authorization = req.get('authorization')

  if (!authorization || !authorization.toLowerCase().startsWith('bearer ')) {
    return res.status(401).json({ error: 'token missing' })
  }

  try {
    decodedToken = jwt.verify(
      authorization.substring(7),
      SECRET
    )
    console.log(req.decodedToken)
    const session = await ActiveSession.findOne({
    where: {
     // userId: decodedToken.id,
      token: authorization.substring(7)
    }
  })
  console.log(session, 'active session found')

  if (!session ) {
    return res.status(401).json({ error: 'session revoked' })
  }

    req.decodedToken = decodedToken
    req.user = await User.findByPk(decodedToken.id)
    req.session = session


  } catch (error) {
    return res.status(401).json({ error: 'token invalid' })
  }

  next()
}

module.exports = tokenExtractor
