import { createSlice } from "@reduxjs/toolkit"

const filterSlice = createSlice({
  name: "filter",
  initialState: "",
  reducers: {
    filterChange(state, action) {
      return action.payload
    },
  }
})

//default can be imported with anyname, importfilterReducer still works
export const { filterChange } = filterSlice.actions
export default filterSlice.reducer