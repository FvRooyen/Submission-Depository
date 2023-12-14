import {
  Routes, Route, Link,
  useNavigate, Navigate
} from 'react-router-dom'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'
import { useApolloClient} from '@apollo/client'
import { useState } from 'react'
import { BOOK_ADDED } from './queries'
import { useSubscription } from '@apollo/client'

// export const updateCache = (cache, query, addedBook) => { 
//   const uniqByTitle = (a) => {    
//     let seen = new Set()    
//     return a.filter((item) => {      
//       let k = item.title      
//       return seen.has(k) ? false : seen.add(k)    
//     })  
//   }

//   cache.updateQuery(query, ({ allBooks }) => {    
//     return {      
//       allBooks: uniqByTitle(allBooks.concat(addedBook)),    
//     }  
//   })
// }

const padding = {
  padding: 5
}

const Home = () => {
  return (
    <div>
      <h1>Library Application</h1>
      <h3>Welcome to our library app!</h3>
      <p>Use the above links to navigate</p>
     
    </div>
  )
}

const App = () => {
  const [token, setToken] = useState(null)
  //console.log(token)
  const client = useApolloClient()
  const navigate = useNavigate()
  //const [error, setError] = useState(null)

   useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({subscriptionData}) => {
      window.alert(`New Book Titled: ${subscriptionData.data.bookAdded.title} added`)
    }
    // onData: ({ data }) => {
    //   const addedBook = data.data.bookAdded
    //   //updateCache(client.cache, {query: GET_BOOKS}, addedBook)  
    //   window.alert(`New Book Titled: ${addedBook.title} added`)
    // }
  })

  const logout = () => {    
    setToken(null)    
    localStorage.clear()    
    client.resetStore()  
    navigate('/login')
  }

  return (
    <div>
        {token ? (
          <div> 
          <button onClick={logout}>logout</button>
          <Link style={padding} to="/">Home</Link>
          {/* <Link style={padding} to="/books">Books</Link> */}
          <Link style={padding} to="/add">Add</Link>
          <Link style={padding} to="/recommended">Recommended</Link>
          </div>
          ) : (
          <Link style={padding} to="/login">
            Login
          </Link>
        ) }
      <Link style={padding} to="/authors">Authors</Link>
      <Link style={padding} to="/books">Books</Link>

      <Routes>
        <Route path="/recommended" element={<Recommend />} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add" element={<NewBook />} />
        <Route path="/" element={ token ? <Home /> : <Navigate replace to={"/login"} />} />  
        <Route path="/login" element={<LoginForm
                onLogin={setToken}
              />} />
      </Routes>
    </div>
  )
}

export default App
