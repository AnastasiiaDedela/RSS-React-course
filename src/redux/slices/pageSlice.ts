import { createSlice } from '@reduxjs/toolkit';

export interface Page {
  page: string;
}

const initialState: Page = {
  page: '',
};

const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
  },
});

export const { setPage } = pageSlice.actions;
export default pageSlice.reducer;
