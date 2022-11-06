const _ = require('lodash')

const dummy = (blogs) => {
  blogs
  return 1
}

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

const oneBlog = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  }
]

const totalLikes = (blog) => {
  const total = blog.reduce(
    (previousValue, currentValue) => previousValue + currentValue.likes, 0
  )
  console.log(total)
  return total
}

const favoriteBlog = (blog) => {
  if (blog.length === 0) {
    return null
  }

  const mostLikes = Math.max(...blog.map(blog => blog.likes), 0)
  console.log(mostLikes)

  const favBlog = blog.find(blog => blog.likes === mostLikes)
  console.log(favBlog)

  return ({
    title: favBlog.title,
    author: favBlog.author,
    likes: favBlog.likes
  })
}

const mostBlogs = (blog) => {

  const authorlist = _.chain(blog)
    .groupBy('author')
    .map(function(v,i) {
      return {
        author: i,
        blogs: v.length
      }
    })
    .value()
  console.log(authorlist)

  const popAuthor = _.maxBy(authorlist, 'blogs')
  console.log(popAuthor)

  return(popAuthor)
}

const mostLikes = (blog) => {

  const authorlist = _.chain(blog)
    .groupBy('author')
    .map(function(v,i) {
      return {
        author: i,
        likes: v.reduce((acc, cur) =>
          acc + cur.likes, 0)
      }
    })
    .value()

  console.log(authorlist)

  const popAuthor = _.maxBy(authorlist, 'likes')
  console.log(popAuthor)

  return(popAuthor)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  blogs,
  oneBlog
}