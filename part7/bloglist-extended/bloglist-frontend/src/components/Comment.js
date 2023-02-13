import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createComment } from '../reducers/blogReducer'
import { createNotification } from '../reducers/notificationReducer'
import { Form, Button, Container } from 'react-bootstrap'

const Comment = ({ blog }) => {
    const dispatch = useDispatch()

    const [comment, setComment] = useState('')
    const handleCommentChange = (event) => setComment(event.target.value)

    const addComment = async (event) => {
        event.preventDefault()

        const updatedComments = blog.comments.concat(comment)

        const blogObject = {
            ...blog,
            comments: updatedComments
        }

        dispatch(createComment(blogObject))
            .then(() => {
                dispatch(createNotification('Comment added', 0, true))
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

        setComment('')
    }

    return (
        <>
            <Container>
                <div>
                    <Form onSubmit={addComment}>
                        <Form.Group>
                            <Form.Label>Add comment: </Form.Label>
                            <Form.Control
                                type="text"
                                value={comment}
                                name="comment"
                                onChange={handleCommentChange}
                                placeholder="add comment.."
                                id="comment"
                            />
                        </Form.Group>
                        <Button
                            variant="primary"
                            type="submit"
                            style={{ marginTop: 10 }}
                        >
                            Save
                        </Button>
                    </Form>
                </div>
                <div>
                    <h3 style={{ marginTop: 10 }}>Comments</h3>
                    <ul>
                        {blog.comments.map((comment) => (
                            <li>{comment}</li>
                        ))}
                    </ul>
                </div>
            </Container>
        </>
    )
}

export default Comment
