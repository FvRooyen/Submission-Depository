import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Container } from 'react-bootstrap'

const User = () => {
    const id = useParams().id
    const user = useSelector((state) => state.users.find((n) => n.id === id))

    if (!user) return null

    return (
        <div>
            <Container>
                <h2 style={{ marginTop: 10 }}>{user.name}</h2>
                <h4 style={{ marginTop: 5 }}>Added blogs:</h4>
                <ul>
                    {user.blogs.map((blog) => (
                        <li key={blog.id}>
                            <i> {blog.title}</i> by {blog.author}
                        </li>
                    ))}
                </ul>
            </Container>
        </div>
    )
}

export default User
