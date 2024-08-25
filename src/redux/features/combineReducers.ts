import { combineReducers } from '@reduxjs/toolkit';
import heroesReducer from '../slices/heroesSlice';
import selectedHeroesReducer from '../slices/selectedHeroesSlice';
import { heroesApi } from '../api/heroApi';

const rootReducer = combineReducers({
  heroes: heroesReducer,
  selectedHeroes: selectedHeroesReducer,
  [heroesApi.reducerPath]: heroesApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
