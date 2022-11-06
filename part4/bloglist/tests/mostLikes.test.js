const most = require('../utils/list_helper').mostLikes
const blogs = require('../utils/list_helper').blogs
const oneBlog = require('../utils/list_helper').oneBlog

describe('author with most likes', () => {

  test('of empty list is undefined', () => {
    expect(most()).toEqual(undefined)
  })

  test('when list has only one blog equals that', () => {
    expect(most(oneBlog)).toEqual({
      author: 'Michael Chan',
      likes: 7
    })
  })

  test('of a bigger list is calculated right', () => {
    expect(most(blogs)).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17
    })
  })
})

//working