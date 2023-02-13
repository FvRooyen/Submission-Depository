import { useDispatch, useSelector } from 'react-redux'
import { voteFor, removeBlog } from '../reducers/blogReducer'
import { useParams, useNavigate } from 'react-router-dom'
import { Button, Container } from 'react-bootstrap'
import { HandThumbsUp, Link } from 'react-bootstrap-icons'

//import { Link } from 'react-router-dom'
import { createNotification } from '../reducers/notificationReducer'
import Comment from './Comment'

const Blog = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const id = useParams().id

    const blog = useSelector((state) => state.blogs.find((n) => n.id === id))

    const user = useSelector((state) => state.login)

    if (!blog) return null
    if (!user) return null

    const deleteBlog = async (blog) => {
        if (
            window.confirm(
                `Are you sure you want to delete ${blog.title} by ${blog.author}?`
            )
        ) {
            dispatch(removeBlog(blog.id))
                .then(() => {
                    dispatch(
                        createNotification(
                            `Blog:${blog.title} deleted`,
                            0,
                            true
                        )
                    )
                    navigate('/')
                })
                .catch(() => {
                    dispatch(
                        createNotification(
                            'Delete failed, check network connection',
                            1,
                            true
                        )
                    )
                })
        }
    }

    const likeBlog = async (blog) => {
        dispatch(voteFor(blog))
            .then(() => {
                dispatch(
                    createNotification(
                        `You liked ${blog.title} by ${blog.author}!`,
                        0,
                        true
                    )
                )
            })
            .catch((exception) => {
                dispatch(
                    createNotification(exception.response.data.error, 1, true)
                )
            })
    }
    // make pretty. Ugly at the moment
    return (
        <>
            <Container>
                <div>
                    <h2 style={{ marginTop: 10 }}>
                        {blog.title} by <em>{blog.author}</em>
                    </h2>
                    <p>
                        <Link />
                        <a
                            href={blog.url}
                            target="_blank"
                            style={{ padding: 10 }}
                        >
                            {blog.url}
                        </a>
                    </p>
                    <p>
                        <span style={{ paddingRight: 10 }}>
                            Likes: {blog.likes}{' '}
                        </span>
                        <Button
                            variant="success"
                            size="sm"
                            onClick={() => {
                                likeBlog(blog)
                            }}
                        >
                            <HandThumbsUp />
                            Like
                        </Button>
                    </p>
                    <p>
                        Added by: <strong> {blog.user.username}</strong>
                    </p>
                    {blog.user.username === user.username && (
                        <Button
                            variant="dark"
                            style={{ marginTop: 10 }}
                            onClick={() => {
                                deleteBlog(blog)
                            }}
                        >
                            Delete blog
                        </Button>
                    )}
                </div>
            </Container>
            <div>
                <Comment blog={blog} />
            </div>
        </>
    )
}

export default Blog
