import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  
    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.createAnecdote(content)
        props.createNotification(`Anecdote: '${content}' created`, 10) 
      }

    return (
      <><h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name='anecdote' />
          </div>
        <button type='submit'>create</button>
      </form>
      </>
    )
  }
  
  const mapDispatchtoProps = {
    createAnecdote,
    createNotification
  }

  export default connect(null, mapDispatchtoProps)(AnecdoteForm)