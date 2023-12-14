import { useQuery } from '@apollo/client'
import { GET_BOOKS} from '../queries'
//import { updateCache } from '../App'
import { useState } from 'react'

const Books = () => {
 const [selectGenre, setSelectGenre] = useState(null)
 const bookresult = useQuery(GET_BOOKS, {
  variables: {genre: selectGenre},
 })

  // useSubscription(BOOK_ADDED, {
  //   onData: ({ data, client }) => {
  //     const addedBook = data.data.bookAdded
  //     window.alert(`New Book Titled: ${addedBook.title} added`)


  //     updateCache(client.cache, {query: GET_BOOKS}, addedBook)  
  //   }
  // })

  if (bookresult.loading)  {
    return <div>loading...</div>
  }

  const books =  bookresult.data.allBooks

  const genreList = Array.from(new Set(books.flatMap(b => b.genres)))

  return (
    <div>
      <h2>Books</h2>
      <p> in genre: {selectGenre}</p> 
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

<div>
      <h3>Filter books by genre:</h3>
      {genreList.map(g => (
        <button
        key={g}
        onClick={()=>setSelectGenre(g)}>
          {g}
        </button>
      ))}

    <button onClick={() => setSelectGenre(null)}>All genres</button>
   </div>
    </div>
  )
}

export default Books
