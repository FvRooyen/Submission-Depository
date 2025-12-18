const router = require('express').Router()
const { Op } = require('sequelize')
const { Blog, User } = require('../models')
const tokenExtractor = require('../util/tokenExtractor')

router.get('/', async (req, res, next) => {
 
  try {
  
    let where = {}
  if(req.query.search) {
    where = {
      [Op.or]: [
        {title: {[Op.iLike]: `%${req.query.search}%`}},
        {author: {[Op.iLike]: `%${req.query.search}%`}}
      ]
    }
  }

  const blogs = await Blog.findAll({
      attributes: {exclude: ['userId']},
      include: {
        model: User, 
        attributes: ['name']
      },
      where, 
      order: [
        ['likes', 'DESC']
      ]

   })
  console.log(JSON.stringify(blogs, null, 2))
  res.json(blogs)
  } catch (error) {
    next(error)
  }
  })

router.get('/:id', async (req, res, next) => {
  try{
    const blog = await Blog.findByPk(req.params.id)
      if(blog) {
        res.json(blog)
      } else {
        res.status(404).end()
      }
    } catch (error) {
      next(error)
    }
  })
  
router.put('/:id', async (req, res, next) => {
  try{
  const blog = await Blog.findByPk(req.params.id)
  blog.likes = req.body.likes
  
  await blog.save()
  res.json(blog)
  } catch (error) {
    next(error)
  }
  })
  
router.post('/', tokenExtractor, async (req, res, next) => {
  try{
  const user = await User.findByPk(req.decodedToken.id)  
  const blog = await Blog.create({...req.body, userId: user.id, date: new Date()})
  return res.status(201).json(blog)
  } catch (error) {
    next(error)
  }
  })
  
router.delete('/:id', tokenExtractor, async(req, res, next) => {
  try{
  const user = await User.findByPk(req.decodedToken.id)  
  const blog = await Blog.findByPk(req.params.id)

  if (!blog) return res.status(404).json({ error: 'Blog not found' });

  if (user.id === blog.userId) {
    await blog.destroy()
    res.status(204).end()
  } else {
    return res.status(404).json({ error: 'Not authorized to delete this blog' });
  }
} catch (error) {
    next(error)
  }
})

module.exports = router