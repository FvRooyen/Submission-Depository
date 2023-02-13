import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useRef } from 'react'
import { createBlog } from '../reducers/blogReducer'
import { createNotification } from '../reducers/notificationReducer'
import Togglable from './Togglable'
import { Form, Button, Container } from 'react-bootstrap'

const Newblog = () => {
    const dispatch = useDispatch()
    const blogFormRef = useRef()

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleTitleChange = (event) => setTitle(event.target.value)
    const handleAuthorChange = (event) => setAuthor(event.target.value)
    const handleUrlChange = (event) => setUrl(event.target.value)

    const addBlog = async (event) => {
        event.preventDefault()

        const blog = {
            title: title,
            url: url,
            author: author,
            likes: 0
        }

        dispatch(createBlog(blog))
            .then(() => {
                dispatch(createNotification(`${blog.title} created`, 0, true))
                blogFormRef.current.toggleVisibility()
            })
            .catch((exception) => {
                dispatch(
                    createNotification(
                        `${exception.response.data.error}`,
                        1,
                        true
                    )
                )
            })

        setAuthor('')
        setTitle('')
        setUrl('')
    }

    return (
        <div>
            <Container>
                <h2 style={{ marginTop: 10 }}>Create new blog entry</h2>
                <Togglable buttonLabel="add blog" ref={blogFormRef}>
                    <Form onSubmit={addBlog}>
                        <Form.Group>
                            <Form.Label>Title: </Form.Label>
                            <Form.Control
                                type="text"
                                value={title}
                                name="title"
                                onChange={handleTitleChange}
                                placeholder="title"
                                id="title"
                            />
                            <Form.Label>Author: </Form.Label>
                            <Form.Control
                                type="text"
                                value={author}
                                name="author"
                                onChange={handleAuthorChange}
                                placeholder="author"
                                id="author"
                            />
                            <Form.Label>URL: </Form.Label>
                            <Form.Control
                                type="text"
                                value={url}
                                name="url"
                                onChange={handleUrlChange}
                                placeholder="url"
                                id="url"
                            />
                            <Button
                                variant="success"
                                type="submit"
                                style={{ marginTop: 10 }}
                            >
                                Save
                            </Button>
                        </Form.Group>
                    </Form>
                </Togglable>
            </Container>
        </div>
    )
}

export default Newblog
