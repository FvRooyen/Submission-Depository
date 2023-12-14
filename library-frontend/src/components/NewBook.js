import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { GET_BOOKS, CREATE_BOOK, ALL_AUTHORS} from '../queries'
import Notify from './Notify'
//import { updateCache } from '../App'

const NewBook = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const [error, setError] = useState(null)

  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{query: GET_BOOKS}, {query: ALL_AUTHORS}],
    onError: (error) => {
      const messages = error.graphQLErrors.map(e => e.message).join('\n')
      setError(messages)
      setTimeout(() => {      
           setError(null)    
         }, 10000) 
    },
    // update: (cache, response) => {
    //   updateCache(cache, {query: GET_BOOKS}, response.data.addBook)
    // }
  })

  const submit = async (event) => {
    event.preventDefault()

    createBook({variables: {title, author, published, genres}})
    console.log('add book...')
    
    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <Notify errorMessage={error} />
      <h2>Create new book</h2>
      <form onSubmit={submit}>
        <div>
          Title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          Published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.valueAsNumber)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            Add genre
          </button>
        </div>
        <div>Genres: {genres.join(' ')}</div>
        <button type="submit">Create Book</button>
      </form>
    </div>
  )
}

export default NewBook