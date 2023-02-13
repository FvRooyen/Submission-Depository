import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

const loginSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser(state, action) {
            const user = action.payload
            return user
        }
    }
})

export const { setUser } = loginSlice.actions

export const handleLogout = () => {
    return async (dispatch) => {
        window.localStorage.clear()
        await blogService.setToken(null)
        dispatch(setUser(null))
    }
}

export const handleLogin = ({ username, password }) => {
    return async (dispatch) => {
        const user = await loginService.login({
            username,
            password
        })
        window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
        await blogService.setToken(user.token)
        dispatch(setUser(user))
    }
}

export default loginSlice.reducer
