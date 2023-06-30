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
export default notificationSlice.reducer