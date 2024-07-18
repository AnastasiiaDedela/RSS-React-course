import { combineReducers } from '@reduxjs/toolkit';
import heroesReducer from '../slices.ts/heroesSlice';
const rootReducer = combineReducers({
    heroes: heroesReducer,
});
export default rootReducer;
