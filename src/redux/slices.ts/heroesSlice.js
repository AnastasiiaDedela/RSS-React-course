import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    count: 0,
    isLoading: true,
    heroes: [],
};
const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        setHeroes(state, action) {
            state.heroes = action.payload;
        },
        setCount(state, action) {
            state.count = action.payload;
        },
        setIsLoading(state, action) {
            state.isLoading = action.payload;
        },
    },
});
export const { setHeroes, setCount, setIsLoading } = heroesSlice.actions;
export default heroesSlice.reducer;
