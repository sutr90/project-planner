import { combineReducers } from '@reduxjs/toolkit';
import rowSliceReducer from './rowsSlice'

export default combineReducers({
    rows: rowSliceReducer
});