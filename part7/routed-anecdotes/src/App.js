import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  useParams
} from "react-router-dom";

import { useState } from 'react';
import { useField } from "./hooks";

const Menu = ({ anecdotes, addNew}) => {
  const padding = {
    paddingRight: 5
  }

  return (
    <div>
    <Router>
      <div>
        <Link style={padding} to='/'>anecdotes</Link>
        <Link style={padding} to='/create'>create new</Link>
        <Link state={padding} to='/about'>about</Link>
      </div>

      <Routes>
        <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path='/create' element={<CreateNew addNew = {addNew}/>}/>
        <Route path='/about' element={ <About/> }/>
        <Route path='/anecdotes/:id' element={<Anecdote anecdotes={anecdotes} />}/>
      </Routes>
    </Router>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => 
      <li key={anecdote.id} >
        <Link to={`/anecdotes/${anecdote.id}`}>  
        {anecdote.content}
        </Link>
        </li>
        )}
    </ul>
  </div>
)

const Anecdote = ({anecdotes}) => {
  const id = useParams().id
  const anecdote = anecdotes.find(n=>n.id === Number(id))
  
  return(
    <div>
      <h3>{anecdote.content}</h3>
      <p>by: <i>{anecdote.author}</i></p>
      <p>For more info see: <a href = {anecdote.info}>{anecdote.info}</a></p>
      <p>Number of votes: <b>{anecdote.votes}</b></p>
    </div>
)}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const navigate = useNavigate()
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      infor: info.value,
      votes: 0
    })
    navigate('/')
  }

  const handleClick = (e) => {
  e.preventDefault()
  content.reset()
  author.reset()
  info.reset()
  }


  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content:
          <input {...content.bind} />
        </div>
        <div>
          author:
          <input {...author.bind} />
        </div>
        <div>
          url for more info:
          <input {...info.bind} />
        </div>
        <button>create</button>
        <button onClick={handleClick}>reset</button>
      </form>
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`A new anecdote: '${anecdote.content}' created!`)
    setTimeout(()=> {
      setNotification('')
    },5000)
  }

//remove useMatch and go back to how you did it in the first place
 /* const match = useMatch('anecdotes/:id')

  const anecdote = match
  ? anecdotes.find(n => n.id === Number(match.params.id))
  :null
*/
 /* const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }
*/
  return (
    <div>
      <h1>Software anecdotes</h1>
      <b>{notification}</b>
      <Menu anecdotes={anecdotes} addNew={addNew}/>
      <footer>
      <Footer />
      </footer>
    </div>
  )
}

export default App

