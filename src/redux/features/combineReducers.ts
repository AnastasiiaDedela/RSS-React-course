import { combineReducers } from '@reduxjs/toolkit';
import heroesReducer from '../slices/heroesSlice';
import { heroesApi } from '../api/heroApi';

const rootReducer = combineReducers({
  heroes: heroesReducer,
  [heroesApi.reducerPath]: heroesApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
