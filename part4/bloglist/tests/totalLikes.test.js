const total = require('../utils/list_helper').totalLikes
const blogs = require('../utils/list_helper').blogs
const oneBlog = require('../utils/list_helper').oneBlog

describe('total likes', () => {

  test('of empty list is zero', () => {
    expect(total([])).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    expect(total(oneBlog)).toBe(7)
  })

  test('of a bigger list is calculated right', () => {
    expect(total(blogs)).toBe(36)
  })

})

//working