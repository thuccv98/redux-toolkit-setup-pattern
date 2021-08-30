import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = '';

const themeSlice = createSlice({
  name: 'theme',
  initialState: { value: initialStateValue },
  reducers: {
    changeColor: (state, action) => {
      state.value = action.payload;
    },
  },
});

const { reducer, actions } = themeSlice;
export const { changeColor } = actions;
export default reducer;
