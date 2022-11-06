const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('../utils/test_helper')
const app = require('../app')
const api = supertest(app)
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Blog = require('../models/blognote')
const User = require('../models/users')

let token = null

beforeEach(async () => {
  await User.deleteMany({})
  const saltRounds = 10
  const passwordHash = await bcrypt.hash('password', saltRounds)

  const user = new User ({
    username: 'redd',
    name: 'Frances Redd',
    passwordHash,
    _id: '6365195947e725976ee5123a',
    __v: 0

  })
  await user.save()

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  token = jwt.sign(
    userForToken,
    process.env.SECRET
  )

  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))

  const promiseArray = blogObjects.map(blog => blog.save())

  await Promise.all(promiseArray)
})

describe('when the api makes a get request', () => {
  //pass
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  //pass
  test('blogs are returned as json files', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  //pass
  test('unique identifier property of blog is name ID', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
  })
})

describe('when the api makes a post request', () => {
  //pass
  test('a valid blog can be added from an authorised user', async () => {
    const newBlog =  {
      title: 'My Blog',
      author: 'Frances Redd',
      url: 'https://myblog.com/',
      likes: 12
    }
    console.log(token)

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    const title = blogsAtEnd.map(n => n.title)
    expect(title).toContain( 'My Blog')
  })

  test('a blog cant be added from an unauthorised user', async () => {
    const newBlog =  {
      _id: '5a422a851b54a676234d17f8',
      title: 'My Blog',
      author: 'Frances van Rooyen',
      url: 'https://myblog.com/',
      likes: 12,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${'pingpong'}`)
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  //pass
  test('likes defaults to zero', async () => {
    const newBlog =  {
      title: 'PingPong',
      author: 'Frances Redd',
      url: 'https://pingpong.com/'
    }
    console.log(token)
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    expect(response.body.likes).toBe(0)
  })

  //pass
  test('blog without title or url is not added', async () => {
    const newBlog =  {
      _id: '5a422a851b54a676234d17f9',
      author: 'Frances Redd',
      likes: 12,
      __v: 0
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('when the api makes a delete request', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    console.log(blogToDelete)

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const title = blogsAtEnd.map(r => r.title)

    expect(title).not.toContain(blogToDelete.title)
  })

  test('does not succeed if unauthorised', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    console.log(blogToDelete)

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${'pingpong'}`)
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length
    )

    const title = blogsAtEnd.map(r => r.title)
    console.log(title)

    expect(title).toContain(blogToDelete.title)
  })

})

describe('when a put request is made', () => {
  test('updates likes', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const newLikes = {
      likes: 999 }

    const result = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send( newLikes)
      .expect(201)

    console.log(result.body)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    expect(blogsAtEnd[0].likes).toBe(newLikes.likes)

  })

  test('fails if ID is invalid', async () => {
    const nonId = '6365225e26fde13a306d4601'

    const newLikes = {
      likes: 999 }

    await api
      .put(`/api/blogs/${nonId}`)
      .send( newLikes)
      .expect(404)
  })
})

afterAll(() => {
  mongoose.connection.close()
})


