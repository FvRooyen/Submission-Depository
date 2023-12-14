import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'
import Notify from './Notify'

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const [ login ] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error)
    const messages = error.graphQLErrors[0].message
    setError(messages)    
    setTimeout(() => {      
    setError(null)    
  }, 10000) 
    }
  })

  const submit = async (event) => {
    event.preventDefault()
    const result = await login({ variables: { username, password } })

    if ( result.data ) {
      const token = result.data.login.value
      //console.log(token, 'token')
      onLogin(token)
      localStorage.setItem('libraryapp-user-token', token)
      navigate('/')
    }

  }

  return (
    <div>
     <Notify errorMessage={error} />
      <form onSubmit={submit}>
        <div>
          username 
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password 
          <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm