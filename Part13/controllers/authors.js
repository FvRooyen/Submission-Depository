const router = require('express').Router()
const { Blog } = require('../models')
const { sequelize } = require('../util/db')

router.get('/', async (req, res, next) => {
  try {
    const authors = await Blog.findAll({
      attributes: [
        'author',
        [sequelize.fn('SUM', sequelize.col('likes')), 'total_likes']
      ],
      group: ['author'],
      order: [[sequelize.fn('SUM', sequelize.col('likes')), 'DESC']]
    })

    res.json(authors)
  } catch (error) {
    next(error)
  }
})

module.exports = router
