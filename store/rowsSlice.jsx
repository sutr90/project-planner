import {createSlice} from "@reduxjs/toolkit"

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
            return state.filter(row => row.id !== id);
        },
        toggleRowEditable(state, action) {
            const {id} = action.payload;
            return state.map(row => {
                if (row.id !== id) {
                    return row;
                }

                return {
                    ...row,
                    ...action.payload
                }
            })
        }
    }
});

export const {addRow, deleteRow, toggleRowEditable} = rowsSlice.actions;
export default rowsSlice.reducer;