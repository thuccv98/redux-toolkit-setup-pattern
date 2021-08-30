import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import themeReducer from './features/themeSlice';

const store = configureStore({
  // Contains all reducers
  reducer: {
    user: userReducer,
    theme: themeReducer,
  },
});

export default store;
