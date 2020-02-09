import { createSlice } from "@reduxjs/toolkit"

const rowsSlice = createSlice({
    name: 'rows',
    initialState: [],
    reducers: {
        addRow(state, action) {
            const row = action.payload;
            return [...state, row];
        },
        deleteRow(state, action) {
            const id = action.payload;
            return state.filter(row => row.id != id);
        }
    }
})

export const { addRow, deleteRow } = rowsSlice.actions
export default rowsSlice.reducer