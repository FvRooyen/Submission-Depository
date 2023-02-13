import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Table, Container } from 'react-bootstrap'
import { Person } from 'react-bootstrap-icons'

const Userlist = () => {
    const users = useSelector((state) => state.users)

    if (!users) return null

    const userlist = users.map((user) => {
        let line = {
            id: user.id,
            username: user.name,
            blogs: user.blogs.length
        }

        return line
    })

    return (
        <div>
            <Container>
                <h2 style={{ marginTop: 10 }}>Users</h2>
                <div>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Blogs</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userlist.map((user) => (
                                <User key={user.id} user={user} />
                            ))}
                        </tbody>
                    </Table>
                </div>
            </Container>
        </div>
    )
}

export default Userlist

const User = ({ user }) => {
    return (
        <>
            <tr>
                <td>
                    <Person />
                    <Link to={`/users/${user.id}`}>{user.username}</Link>
                </td>
                <td>{user.blogs}</td>
            </tr>
        </>
    )
}
