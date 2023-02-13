import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { handleLogin } from '../reducers/loginReducer'
import { createNotification } from '../reducers/notificationReducer'
import { useNavigate } from 'react-router-dom'

import { Form, Button, Container } from 'react-bootstrap'

const LoginForm = () => {
    const dispatch = useDispatch()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const login = async (event) => {
        event.preventDefault()
        dispatch(handleLogin({ username, password }))
            .then(() => {
                dispatch(createNotification(`${username} logged in!`, 0, true))
                setUsername('')
                setPassword('')
                navigate('/')
            })
            .catch(() => {
                dispatch(createNotification('Invalid Credentials', 1, true))
            })
    }

    return (
        <>
            <Container>
                <h2 style={{ marginTop: 10 }}>Log-in to Application</h2>
                <Form onSubmit={login}>
                    <Form.Group>
                        <Form.Label>Username: </Form.Label>
                        <Form.Control
                            type="text"
                            name="Username"
                            id="username"
                            value={username}
                            onChange={({ target }) => setUsername(target.value)}
                        />
                        <Form.Label>Password: </Form.Label>
                        <Form.Control
                            type="password"
                            id="password"
                            value={password}
                            name="Password"
                            onChange={({ target }) => setPassword(target.value)}
                        />
                        <Button
                            variant="primary"
                            type="submit"
                            style={{ marginTop: 10 }}
                        >
                            Login
                        </Button>
                    </Form.Group>
                </Form>
            </Container>
        </>
    )
}

export default LoginForm
