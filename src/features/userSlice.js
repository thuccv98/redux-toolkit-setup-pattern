import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: { value: { name: '', age: 0, email: '' } },
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
  },
});

const { reducer, actions } = userSlice;
export const { login } = actions;
export default reducer;
