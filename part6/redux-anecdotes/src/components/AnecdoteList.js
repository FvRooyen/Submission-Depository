import { useDispatch , useSelector} from 'react-redux'
import {initializeAnecdotes, voteFor} from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'


const AnecdoteList = () => {
  const dispatch = useDispatch()
  
  const anecdotes = useSelector(({ filterList, anecdotes }) => {
   if (filterList === '' ) {
     return anecdotes
    } else {
   return anecdotes.filter(anecdote => 
      anecdote.content.toLowerCase().includes(filterList.toLowerCase()))
   }
    })

  const vote = async (anecdote) => {
    console.log(anecdote)
    dispatch(voteFor(anecdote))
    dispatch(initializeAnecdotes())
    dispatch(createNotification(`You voted for '${anecdote.content}!`, 10))
  }

  return ( 
    <><h1>Anecdotes</h1><div>
      {anecdotes
        .slice()
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </div></>
  )
}

export default AnecdoteList