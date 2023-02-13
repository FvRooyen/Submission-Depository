import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const userSlice = createSlice({
    name: 'userlist',
    initialState: null,
    reducers: {
        setUserlist(state, action) {
            return action.payload
        }
    }
})

export const { setUserlist } = userSlice.actions

export const initializeUsers = () => {
    return async (dispatch) => {
        const users = await userService.getAllUsers()
        dispatch(setUserlist(users))
    }
}

export default userSlice.reducer
