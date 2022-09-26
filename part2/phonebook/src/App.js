import { useState, useEffect } from 'react'
import contactService from './services/contact'
import Filter from './Components/Filter'
import AddContact from './Components/AddContact'
import Phonebook from './Components/Phonebook'
import Notification from './Components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(
    { message: null, type: null})

  const handleNameChange = (event) => {setNewName(event.target.value)}
  const handleNumberChange = (event) => {setNewNumber(event.target.value)} 
  const handleFiltering = (event) => {setFilter(event.target.value)}

  useEffect(() => {    
    contactService
    .getAll()    
    .then(initialContacts => {              
      setPersons(initialContacts)      
    })  
  }, [])  
    
 console.log('render', persons.length, 'persons')
  
const handleForm= (event) =>  {
      event.preventDefault()
      
      const contactObject = {
        name: newName,
        number: newNumber
      }

      const testDuplicate = persons.some(element => {
        if (element.name === newName) {
          return true;
        }
        return false;
      })
    
      if (testDuplicate === true) {
        changeNumber(contactObject)}
        else {
          addContact(contactObject)
      }
    }
  
  const addContact = (contactObject) => {
    contactService
    .create(contactObject)
    .then((newContact) => {
      setPersons(persons.concat(newContact))      
      setNewName('')
      setNewNumber('')  
      setNotification({message:`${contactObject.name} has been added to the Phonebook`, type: 0})
      setTimeout(()=>{setNotification([null,null])}, 5000)  })
  }

const changeNumber = (contactObject) => {
      const person = persons.find(n => n.name === contactObject.name)
      console.log(person)
      
      
      if(window.confirm(`${newName} already exists in phonebook. Replace old number with new number?`)){   
        const changedPerson = { ...person, number: newNumber }
        console.log(changedPerson)
        
        contactService
      .update(changedPerson.id,changedPerson)
      .then((changedPerson) => {
        setPersons(
          persons.map((person) =>
          person.id !== changedPerson.id ? person : changedPerson))
          setNewName('')
          setNewNumber('')   
          setNotification( {message:`${contactObject.name}'s number has been updated`, type: 0})
          setTimeout(()=>{setNotification({message:null,type:null})}, 5000) 
        })
        .catch(error => {
          setNotification(   {     
            message:`${contactObject.name}'s information has already been deleted from the Phonebook`, type:1}     
            )        
            setTimeout(() => {          
              setNotification({message:null,type:null})        
            }, 5000)
            setPersons(persons.filter(n => n.id !== changedPerson.id))
        })
        ;}
      }
  
  const deleteContact = (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
     contactService
     .remove(id)
     .then(setPersons
      (persons.filter((person)=>
      {return person.id !== id;}
      )))
      .catch(error => {
        setNotification(   {     
          message:`This contact could not be deleted from server`   , type:1}     
          )        
          setTimeout(() => {          
            setNotification({message:null,type:null})        
          }, 5000)
      })
      ;
    }
  }

  const namesToShow = filter ===''
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification notification={notification} />
      <p>Filter names in phonebook:</p>
      <Filter filterValue={filter} onFilterChange={handleFiltering} />
      <h2>Add new names to phonebook</h2>
      <AddContact onSubmit = {handleForm}
                  nameValue = {newName}
                  onNameChange = {handleNameChange}
                  numberValue = {newNumber}
                  onNumberChange = {handleNumberChange} 
                  />
      <h2>Numbers</h2>
       <Phonebook persons = {namesToShow} 
                  deleteContact = {deleteContact}/>
    </div>

  )
}


export default App