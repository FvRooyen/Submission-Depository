import { configureStore , applyMiddleware} from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'
import thunk from 'redux-thunk'

const store = configureStore({
    reducer: {
        anecdotes: anecdoteReducer,
        filterList: filterReducer,
        notification: notificationReducer
    }
}, applyMiddleware(thunk))

export default store 