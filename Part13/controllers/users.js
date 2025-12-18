const router = require('express').Router()

const { User, Blog, ActiveSession } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
        model: Blog,
        attributes: {exclude: ['userId']}
    }
  })
  res.json(users)
})

router.get('/:id', async (req, res, next) => {
  try{
    let where = {}

    if(req.query.read) {
        where = {readingStatus: `${req.query.read}`}
      }
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['id','createdAt', 'updatedAt'] } ,
      include:[
        {
          model: Blog,
          as: 'user_readings',
          attributes: { exclude: ['userId', 'createdAt', 'updatedAt']},
          through: { 
            attributes: {exclude: ['userId', 'blogId']},
             where
          }
        }
      ]
  })
      if(user) {
        res.json(user)
      } else {
        res.status(404).end()
      }
    } catch (error) {
      next(error)
    }
  })
  
router.post('/', async (req, res, next) => {
  try{
  const user = await User.create(req.body)
  console.log('user', user)
    res.status(201).json(user)
  } catch (error) {
    next(error)
  }
})

router.put('/:username', async (req, res, next) => {
  try{
    const user = await User.findOne({ where: { username: req.params.username } }) 
    user.username = req.body.username
    await user.save()
    res.status(201).json(user)
  } catch (error) {
    next(error)
  }
})

router.put('/active/:id', async (req, res, next) => {
  try{
    const user = await User.findByPk(req.params.id) 
    user.active = req.query.active
    await user.save()
    await ActiveSession.destroy({
      where: { userId: user.id }
    })
    res.status(201).json(user)
  } catch (error) {
    next(error)
  }
})

module.exports = router