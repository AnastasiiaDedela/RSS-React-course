import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Hero } from '../../types/types';

export interface SelectedHeroesState {
  selectedHeroes: Hero[];
}

const initialState: SelectedHeroesState = {
  selectedHeroes: [],
};

const selectedHeroesSlice = createSlice({
  name: 'selectedHeroes',
  initialState,
  reducers: {
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

export const { toggleSelectHero, clearSelectedHeroes } =
  selectedHeroesSlice.actions;
export default selectedHeroesSlice.reducer;
