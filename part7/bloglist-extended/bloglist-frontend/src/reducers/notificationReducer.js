import { createSlice } from '@reduxjs/toolkit'

const initNot = {
  message: '',
  type: null,
  show: false
}

const notificationSlice = createSlice ({
  name: 'notification',
  initialState: initNot,
  reducers: {
    setNotification(state, action) {
      return action.payload
    }
  }
})

export const { setNotification } = notificationSlice.actions

let timeoutID = null

export const createNotification = (message, type , show) => {
  const delay = 10

  return async dispatch => {
    dispatch(setNotification({ message, type , show }))

    clearTimeout(timeoutID)

    timeoutID = setTimeout(() => {
      dispatch(setNotification(initNot))
    }, delay*1000)
  }
}

export default notificationSlice.reducer