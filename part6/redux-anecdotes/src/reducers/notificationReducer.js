import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    showNotification(state, action) {
      return action.payload
    },
    resetNotification(state, action) {
      return ""
    }
  }
})

export const { showNotification, resetNotification} = notificationSlice.actions

export const showNotificationForTime = (message, seconds) => {
  return async (dispatch) => {
    dispatch(showNotification(message))
    setTimeout(() => {
      dispatch(resetNotification())
    }, seconds * 1000)
  }
}

export default notificationSlice.reducer