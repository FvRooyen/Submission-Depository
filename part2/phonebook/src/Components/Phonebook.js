const Phonebook = ({persons, deleteContact}) => {
    return(
    <ul>
    {persons.map((person) => (
      <Contact key = {person.id}
        person = {person}
        deleteContact={()=> deleteContact(person.id)}
      />
    ))}
   </ul>
    )
  }
  
  const Contact = ({person, deleteContact}) => {
    return (
      <li>
        {person.name}:  {person.number}
        <button onClick={deleteContact}>Delete</button>
        </li>
    )
  }

  export default Phonebook