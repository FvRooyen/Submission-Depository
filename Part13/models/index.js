const Blog = require('./blog')
const User = require('./user')
const Readinglist = require('./readinglist')
const ActiveSession = require('./activeSession')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: Readinglist , as: 'user_readings'})
Blog.belongsToMany(User, { through: Readinglist , as: 'blog_readers'})

ActiveSession.belongsTo(User)
User.hasOne(ActiveSession)

module.exports = {
  Blog, User, Readinglist, ActiveSession
}