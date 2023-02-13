import { configureStore, applyMiddleware } from '@reduxjs/toolkit'
//import blogReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import thunk from 'redux-thunk'
import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/loginReducer'
import userReducer from './reducers/userReducer'

const store = configureStore(
    {
        reducer: {
            notification: notificationReducer,
            blogs: blogReducer,
            login: loginReducer,
            users: userReducer
        }
    },
    applyMiddleware(thunk)
)

export default store
