import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    setMessage(state, action) {
      return action.payload
    },
    resetMessage(state, action) {
      return null
    }
  }
})

export const { setMessage, resetMessage } = notificationSlice.actions
export default notificationSlice.reducer