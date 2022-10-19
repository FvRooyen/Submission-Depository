require('dotenv').config()
const express = require('express')
const morgan = require('morgan') //investigate if needed
const app = express()
const cors = require('cors')
const Contact = require('./models/contact')

//requestlogger?
app.use(express.static('build'))
app.use(express.json())
//app.use(requestLogger)
app.use(cors())
app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :postData'
  )
)

morgan.token('postData', (request) => {
  if (request.method === 'POST') return ' ' + JSON.stringify(request.body)
  else return ' '
})

app.get('/info', (request, response, next) => {
  const date = new Date()

  Contact.find({})
    .then(contacts => {
      response.send(`<p>Phonebook has info for ${contacts.length} contacts. - ${date}</p>`)
    })
    .catch(error => next(error))
})

app.get('/api/contacts', (request, response, next) => {
  Contact.find({})
    .then(contacts => {
      response.json(contacts)
    })
    .catch(error => next(error))
})

app.get('/api/contacts/:id', (request, response, next) => {
  Contact.findById(request.params.id)
    .then(contact => {
      if (contact) {
        response.json(contact)
      } else {
        response.status(404).send({ error: 'Contact does not exist' })
      }
    })
    .catch(error => {next(error)})
})

app.delete('/api/contacts/:id', (request, response, next) => {
  Contact.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/contacts', (request, response, next) => {
  const body = request.body
  console.log(body)
  const contact = new Contact ({
    name: body.name,
    number: body.number,
  })
  console.log(contact)
  contact.save()
    .then(savedContact => {
      response.json(savedContact)
    })
    .catch(error => next(error))
})

app.put('/api/contacts/:id', (request, response, next) => {
  const { name, number } = request.body

  Contact.findByIdAndUpdate(
    request.params.id,
    { name: name,
      number: number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedContact => {
      response.json(updatedContact)
      console.log(updatedContact)
    })
    .catch(error => next(error))
})

app.use(morgan('tiny'))

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}
// this has to be the last loaded middleware.
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})