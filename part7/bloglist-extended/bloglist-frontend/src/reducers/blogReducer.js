import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        updateBlog(state, action) {
            const id = action.payload.id
            const changedBlog = action.payload
            return state.map((blog) => (blog.id !== id ? blog : changedBlog))
        },
        appendBlog(state, action) {
            state.push(action.payload)
        },
        setBlogs(state, action) {
            return action.payload
        },
        deleteBlog(state, action) {
            const id = action.payload.id
            return state.filter((blog) => blog.id !== id)
        }
    }
})

export const { updateBlog, appendBlog, setBlogs, deleteBlog } =
    blogSlice.actions

export const initializeBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const createBlog = (content) => {
    return async (dispatch) => {
        const newBlog = await blogService.create(content)
        dispatch(appendBlog(newBlog))
    }
}

export const voteFor = (content) => {
    return async (dispatch) => {
        const updatedVotes = content.likes + 1
        const changedBlog = {
            ...content,
            likes: updatedVotes
        }

        await blogService.update(changedBlog.id, changedBlog)
        dispatch(updateBlog(changedBlog))
    }
}

export const removeBlog = (content) => {
    return async (dispatch) => {
        await blogService.remove(content)
        dispatch(deleteBlog(content))
    }
}

export const createComment = (content) => {
    const trimmed_id = content.id.trim()

    return async (dispatch) => {
        const updatedBlog = await blogService.comment(trimmed_id, content)
        dispatch(updateBlog(updatedBlog))
    }
}

export default blogSlice.reducer
