import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './features/combineReducers';
//import actionLogger from './middleware/actionLogger';
import { heroesApi } from './api/heroApi';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(heroesApi.middleware),
  // preloadedState: {
  //   selectedHeroes: { selectedHeroes: [] },
  // },
  // middleware: [actionLogger],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
