const favorite = require('../utils/list_helper').favoriteBlog
const blogs = require('../utils/list_helper').blogs
const oneBlog = require('../utils/list_helper').oneBlog

describe('favorite blog', () => {

  test('of empty list is null', () => {
    expect(favorite([])).toBe(null)
  })

  test('when list has only one blog equals that blog', () => {
    expect(favorite(oneBlog)).toEqual({
      title: 'React patterns',
      author: 'Michael Chan',
      likes: 7
    })
  })

  test('of a bigger list is calculated right', () => {
    expect(favorite(blogs)).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    })
  })
})

//working
