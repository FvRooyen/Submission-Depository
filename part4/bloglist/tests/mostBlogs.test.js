const most = require('../utils/list_helper').mostBlogs
const blogs = require('../utils/list_helper').blogs
const oneBlog = require('../utils/list_helper').oneBlog

describe('author with most blogs', () => {

  test('of empty list is none', () => {
    expect(most()).toEqual(undefined)
  })

  test('when list has only one blog equals that', () => {
    expect(most(oneBlog)).toEqual({
      author: 'Michael Chan',
      blogs: 1
    })
  })

  test('of a bigger list is calculated right', () => {
    expect(most(blogs)).toEqual({
      author: 'Robert C. Martin',
      blogs: 3
    })
  })
})

//working