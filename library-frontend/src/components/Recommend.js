import { useQuery } from '@apollo/client'
import {GET_BOOKS, ME} from '../queries'
import { useState, useEffect } from 'react'
//import { updateCache } from '../App'

const Recommend = () => {
  const userresult = useQuery(ME)
  const [favGenre, setFavGenre] = useState([])

  useEffect(() => {
    if (userresult.data) {
      setFavGenre(userresult.data.me.favoriteGenre)
    }
  }, [userresult])

  //const favGenre = userresult.data.me.favoriteGenre
  
  const bookresult = useQuery(GET_BOOKS, {
    variables: {genre: favGenre},
    enabled: !!favGenre
   })

  //  useSubscription(BOOK_ADDED, {
  //   onData: ({ data, client }) => {
  //     const addedBook = data.data.bookAdded
  //     window.alert('New Book Added!')

  //     updateCache(client.cache, {query: GET_BOOKS}, addedBook)  
  //   }
  // })

  if (bookresult.loading)  {
    return <div>loading...</div>
  }

  const books =  bookresult.data.allBooks

  return (
    <div>
      <h2>Recommended Books</h2>
      <p>Based on your favourite genre: ${favGenre}</p>

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

    </div>
  )
}

export default Recommend
