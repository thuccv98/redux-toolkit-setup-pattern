import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';

const store = configureStore({
  // Contains all reducers
  reducer: {
    user: userReducer,
  },
});

export default store;
