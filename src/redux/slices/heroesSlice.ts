import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Hero } from '../../types/types';

export interface HeroesState {
  count: number;
  isLoading: boolean;
  heroes: Hero[];
  selectedHeroes: Hero[];
}

const initialState: HeroesState = {
  count: 0,
  isLoading: true,
  heroes: [],
  selectedHeroes: [],
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
    toggleSelectHero(state, action: PayloadAction<Hero>) {
      const hero = action.payload;
      const isSelected = state.selectedHeroes.find((h) => h.url === hero.url);
      if (isSelected) {
        state.selectedHeroes = state.selectedHeroes.filter(
          (h) => h.url !== hero.url,
        );
      } else {
        state.selectedHeroes.push(hero);
      }
    },
    clearSelectedHeroes(state) {
      state.selectedHeroes = [];
    },
  },
});

export const {
  setHeroes,
  setCount,
  setIsLoading,
  toggleSelectHero,
  clearSelectedHeroes,
} = heroesSlice.actions;
export default heroesSlice.reducer;
