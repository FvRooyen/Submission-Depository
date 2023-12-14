const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')


const resolvers = {
    Query: {
      authorCount: async () => Author.collection.countDocuments(), //works
      bookCount: async () => Book.collection.countDocuments(), //works
      allBooks: async (root, args) => {
        if(!args.author && !args.genre) {
          return Book.find({}).populate('author') //works
        } else if (!args.genre) { 
          const existingAuthor = await Author.findOne({name: args.author})
          
          if (!existingAuthor) {
            return []
          }
          return Book.find({author: existingAuthor._id}).populate('author') //works
        } else if (!args.author) { //find books based on genre
          return Book.find({genres: {$in: args.genre}}).populate('author')
        } else { //find books based on both genre and author
          const existingAuthor = await Author.findOne({name: args.author})
          if (!existingAuthor) {
            return []
          }
          return Book.find({author: existingAuthor._id,genres: {$in: args.genre}}).populate('author')
        }
      }, 
      allAuthors: async () => {
        return Author.find({}).populate('bookCount')
      }, 
      me: (root, args, context) => {
        return context.currentUser
      }
    },
    // Author: {
    //   bookCount: async ({name}) => {
    //    const author = await Author.findOne({name}).select('_id')
    //    const numberbooks = await Book.find({author}).countDocuments()
    //    console.log(numberbooks, 'numberbooks')
    //    return numberbooks
    //   }
    // },
    Mutation: {
      addBook: async (root, args, context) => {
        const currentUser = context.currentUser
        if (!currentUser) {        
          throw new GraphQLError('not authenticated', {         
            extensions: {            
              code: 'BAD_USER_INPUT',          
            }       
           })      
          }
        
        const existingAuthor = await Author.findOne({name: args.author})

        let author = {}
        if (!existingAuthor) {
          author = new Author({ name: args.author, born: 0})
          try {
            await author.save()
          } catch (error) {
            throw new GraphQLError('Adding a new author failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.author,
                error
              }
            })
          }
        } else {
          author = existingAuthor
        }

        const book = new Book({ ...args, author: author})

        try {
          await book.save()
        } catch (error) {
          throw new GraphQLError('Saving book failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.title,
              error
            }
          })
        }
        pubsub.publish('BOOK_ADDED', { bookAdded: book })
        return book
      },
      editAuthor: async (root, args, context) => {
        const currentUser = context.currentUser
        if (!currentUser) {        
          throw new GraphQLError('not authenticated', {         
            extensions: {            
              code: 'BAD_USER_INPUT',          
            }       
           })      
          }
          
        const author = await Author.findOne({name: args.name})
        
        if (!author) {
          return null
        }

        author.born = args.setBornTo

        try {
          await author.save()
        } catch (error) {
          throw new GraphQLError('Updating author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.setBornTo,
              error
            }
        })
      }
      
      return author

      },
      createUser: async (root, args) => {
        const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
    
        return user.save()
          .catch(error => {
            throw new GraphQLError('Creating the user failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.name,
                error
              }
            })
          })
      },
      login: async (root, args) => {
        const user = await User.findOne({ username: args.username })
    
        if ( !user || args.password !== 'secret' ) {
          throw new GraphQLError('wrong credentials', {
            extensions: {
              code: 'BAD_USER_INPUT'
            }
          })        
        }
    
        const userForToken = {
          username: user.username,
          id: user._id,
        }

        console.log('userfortoken', userForToken)
    
        return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
      },
    },
    Subscription: {
      bookAdded: {
        subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
      },
    },
  }

  module.exports = resolvers
  