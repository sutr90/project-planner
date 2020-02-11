import { createSlice } from "@reduxjs/toolkit"

const rowsSlice = createSlice({
    name: 'rows',
    initialState: [],
    reducers: {
        addRow(rows, action) {
            const row = action.payload;
            rows.push(row);
            return rows;
        },
        updateRow(rows, action) {
            const row = action.payload;
            const idx = rows.findIndex(r => r.id === row.id);
            rows[idx] = row;
            return rows;
        },
        deleteRow(rows, action) {
            const id = action.payload;

            const idx = rows.findIndex(row => row.id === id);

            rows.splice(idx, 1);
            rows.forEach(row => {
                const depIdx = row.deps.findIndex(dep => dep === id);
                row.deps.splice(depIdx, 1);
            })

            return rows;
        },
        toggleRowEditable(rows, action) {
            const { id } = action.payload;
            const row = rows.find(row => row.id === id);
            row.editable = !row.editable;
            return rows;
        }
    }
});

export const { addRow, deleteRow, toggleRowEditable, updateRow } = rowsSlice.actions;
export default rowsSlice.reducer;