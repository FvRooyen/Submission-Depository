import { useQuery, useMutation } from '@apollo/client'
import {ALL_AUTHORS, UPDATE_AUTHOR} from '../queries'
import { useState } from 'react'
import Notify from './Notify'
import Select from 'react-select'


const Authors = () => {
  const [error, setError] = useState(null)
  const result = useQuery(ALL_AUTHORS)
  const [newBorn, setBorn] = useState('')
  const [author, setAuthor] = useState({
    value:'',
    label:''
  })

  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{query: ALL_AUTHORS}],
    onError: (error) => {
      const messages = error.graphQLErrors[0].message
      notify(messages)
    }
  })
  
  if (result.loading)  {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors
  const options = authors.map((a) => {
    return {
      value:a.name,
      label:a.name
    }
  })

  const submit = async (event) => {
    event.preventDefault()

    updateAuthor({variables: {name:author.value, setBornTo: parseInt(newBorn,10)}})

    setBorn('')
    setAuthor({ value: '', label: '' })
  }

  const notify = (message) => {    
    setError(message)    
    setTimeout(() => {      
    setError(null)    
  }, 10000)  
}

  return (
    <div>
       <Notify errorMessage={error} />
      <div>
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Born</th>
            <th>Books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          Name
          <Select
            value={author}
            onChange={setAuthor}
            options={options}
            placeholder='Select an author'
            />
        </div>
        <div>
          Born
          <input
            type = 'number'
            pattern = '[0-9]*'
            value={newBorn}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">Update Author</button>
      </form>
      </div>
    </div>
  )
}

export default Authors
