import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Hero } from '../../types/types'; // Adjust the path as necessary

export interface HeroesState {
  count: number;
  isLoading: boolean;
  heroes: Hero[];
}

const initialState: HeroesState = {
  count: 0,
  isLoading: true,
  heroes: [],
};

const heroesSlice = createSlice({
  name: 'heroes',
  initialState,
  reducers: {
    setHeroes(state, action: PayloadAction<Hero[]>) {
      state.heroes = action.payload;
    },
    setCount(state, action: PayloadAction<number>) {
      state.count = action.payload;
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { setHeroes, setCount, setIsLoading } = heroesSlice.actions;
export default heroesSlice.reducer;
