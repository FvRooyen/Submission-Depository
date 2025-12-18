const router = require('express').Router()
const { User, Blog, Readinglist } = require('../models')
const tokenExtractor = require('../util/tokenExtractor')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
        model: Blog,
        attributes: {exclude: ['userId']}
    }
  })
  res.json(users)
})

router.post('/', async (req, res, next) => {
  try{
  const readinglist = await Readinglist.create(req.body)
  console.log('readinglist', readinglist)
    res.status(201).json(readinglist)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', tokenExtractor, async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id)  
  const blog = await Blog.findByPk(req.params.id)

  if (!blog) return res.status(404).json({ error: 'Blog not found' });

  if (user.id === blog.userId) {
    try{
    const readinglist = await Readinglist.findOne({ 
      where: { 
        blogId: blog.id,
        userId: user.id 
      } 
    }) 
    readinglist.readingStatus = req.body.read
    await readinglist.save()
    res.status(201).json(readinglist)
  } catch (error) {
    next(error)
  }
  } else {
    return res.status(404).json({ error: 'Not authorized to update this readinglist' });
  }
})


module.exports = router