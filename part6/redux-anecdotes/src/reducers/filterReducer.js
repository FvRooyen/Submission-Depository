import { createSlice } from "@reduxjs/toolkit"

const filterSlice = createSlice({
    name: 'filter',
    initialState: '',
    reducers: {
      filterList (state, action) {
        state = action.payload
        return state
      }
    }
})
  

export const { filterList } = filterSlice.actions  
export default filterSlice.reducer