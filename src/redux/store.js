import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './features/combineReducers';
const store = configureStore({
    reducer: rootReducer,
});
export default store;
