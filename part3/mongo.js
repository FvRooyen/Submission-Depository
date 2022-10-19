const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]  //receive password via commandline
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://FullstackAdmin:${password}@cluster0.r3n917y.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.connect(url)

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Contact = mongoose.model('Contact', contactSchema)

const contact = new Contact({
  name: name,
  number: number,
})

if (process.argv.length > 3) {
  contact.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
    .catch((err) => console.log(err))
} else {Contact.find({}).then(result => {
  console.log('Phonebook')
  result.forEach(contact => {
    console.log(contact.name, contact.number)
  })
  mongoose.connection.close()
})}



