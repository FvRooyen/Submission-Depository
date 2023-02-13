import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Navigate,
    useNavigate
} from 'react-router-dom'
import { Navbar, Nav, Button, Container } from 'react-bootstrap'

import { initializeBlogs } from './reducers/blogReducer'
import { createNotification } from './reducers/notificationReducer'
import { handleLogout } from './reducers/loginReducer'
import { initializeUsers } from './reducers/userReducer'

import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Newblog from './components/Newblog'
import Userlist from './components/Userlist'
import Bloglist from './components/Bloglist'
import Blog from './components/Blog'
import User from './components/User'

const Home = () => {
    return (
        <>
            <Container>
                <Newblog />
            </Container>
            <Container>
                <Bloglist />{' '}
            </Container>
        </>
    )
}

const App = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const user = useSelector((state) => state.login)

    useEffect(() => {
        dispatch(initializeBlogs())
    }, [dispatch])

    useEffect(() => {
        dispatch(initializeUsers())
    }, [dispatch])

    const logout = async () => {
        dispatch(handleLogout())
            .then(() => {
                dispatch(createNotification('You have logged out!', 0, true))
                navigate('/login')
            })
            .catch((exception) => {
                dispatch(createNotification(`Error: Could not Logout`, 1, true))
            })
    }

    const padding = {
        padding: 5
    }

    return (
        <div className="container">
            <Notification />

            <Container>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#" as="span">
                                {user ? (
                                    <Link style={padding} to="/">
                                        Home
                                    </Link>
                                ) : (
                                    <Link style={padding} to="/login">
                                        Login
                                    </Link>
                                )}
                            </Nav.Link>
                            <Nav.Link href="#" as="span">
                                <Link style={padding} to="/blogs">
                                    Blogs
                                </Link>
                            </Nav.Link>
                            <Nav.Link href="#" as="span">
                                <Link style={padding} to="/users">
                                    Users
                                </Link>
                            </Nav.Link>
                        </Nav>
                        <Nav className="ms-auto">
                            {user ? (
                                <>
                                    <Navbar.Text style={{ paddingRight: 10 }}>
                                        {user.username} logged in
                                    </Navbar.Text>
                                    <Button
                                        variant="secondary"
                                        onClick={logout}
                                    >
                                        Log out
                                    </Button>
                                </>
                            ) : null}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Container>

            <Routes>
                <Route
                    path="/"
                    element={user ? <Home /> : <Navigate replace to="/login" />}
                />
                <Route path="/users" element={<Userlist />} />
                <Route path="/users/:id" element={<User />} />
                <Route path="/blogs" element={<Bloglist />} />
                <Route path="/blogs/:id" element={<Blog />} />
                <Route path="login" element={<LoginForm />} />
            </Routes>
        </div>
    )
}

export default App
