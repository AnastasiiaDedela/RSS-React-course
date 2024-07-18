import { combineReducers } from '@reduxjs/toolkit';
import heroesReducer from '../slices.ts/heroesSlice';

const rootReducer = combineReducers({
  heroes: heroesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
