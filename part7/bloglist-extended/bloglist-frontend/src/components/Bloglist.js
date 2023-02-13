import { useSelector } from 'react-redux'
import { orderBy } from 'lodash'
import { Link } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { ArrowBarRight } from 'react-bootstrap-icons'
//render nicely

const Bloglist = () => {
    const blogs = useSelector((state) => state.blogs)

    const orderedBlog = orderBy(blogs, ['likes'], ['desc'])

    return (
        <div>
            <Container>
                <h2 style={{ marginTop: 15 }}>Blogs</h2>
                {orderedBlog
                    //.sort((a,b) => b.likes - a.likes)
                    .map((blog) => (
                        <Blog key={blog.id} blog={blog} />
                    ))}
            </Container>
        </div>
    )
}

const Blog = ({ blog }) => {
    return (
        <Container>
            <li style={{ listStyleType: 'none' }}>
                <ArrowBarRight />
                <Link to={`/blogs/${blog.id}`}>
                    {blog.title} by {blog.author}
                </Link>
            </li>
        </Container>
    )
}

export default Bloglist
