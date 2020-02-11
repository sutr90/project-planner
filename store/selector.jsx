import {createSelector} from "@reduxjs/toolkit"

const getRows = state => state;

export const getRowOptions = createSelector(
    [getRows],
    (rows) => {
        return rows.map(row => {
            return {id: row.id, name: row.name};
        });
    }
);