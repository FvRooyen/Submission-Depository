const jwt = require('jsonwebtoken')
const router = require('express').Router()
const { User, ActiveSession } = require('../models')
const { SECRET } = require('../util/config')
const tokenExtractor = require('../util/tokenExtractor')

router.get('/', async (req, res) => {
  const sessions = await ActiveSession.findAll({})
  res.json(sessions)
})

router.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ where: { username: username, active: true } })
  
  const passwordCorrect = password === 'secret'

  if (!(user && passwordCorrect)) {
    return response.status(401).json({ error: 'invalid username or password' })
  }

  const userForToken = {
    username: user.username,
    id: user.id
  }

  try {
    const token = jwt.sign(userForToken, SECRET)
    await ActiveSession.destroy({
      where: { userId: user.id }
    })
    await ActiveSession.create({ userId: user.id, token })
    response.status(200).send({ token, username: user.username, name: user.name })
  } catch (err) {
    console.error('JWT sign error:', err)
    response.status(500).json({ error: 'token generation failed' })
  }
})

router.delete('/', tokenExtractor, async (req, res, next) => {
  try{
      await ActiveSession.destroy({
        where: {user_id: req.decodedToken.id}
      })
       res.status(204).json({msg: "logged out"}).end()
  } catch (error) {
    next(error)
  }
})


module.exports = router
