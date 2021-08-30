# Tổng quát về Redux Toolkit

1. Redux Toolkit (RTK) là gì và tại sao lại có nó?

```
npm install @reduxjs/toolkit
```

- RTK là một thư viện giúp mình viết Redux tốt hơn, dễ hơn và đơn giản hơn (tiêu chuẩn để viết Redux).
- Ba vấn đề làm nền tảng ra đơi RTK:
  - Cấu hình một redux store quá phức tạp.
  - Phải add rất nhiều package để có thể làm việc.
  - Rút ngắn được code, đỡ phải gõ nhiều hơn😂.

2. Redux toolkit gồm những gì?

- configureStore():
  - Có sẵn Redux DevTools
  - Có sẵn redux-thunk để thực hiện async actions

```
// Khi chưa có Redux Toolkit
// store.js
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';
// Enable to use redux dev tool in development mode
const composeEnhancers = 'development' === process.env.NODE_ENV
 ? (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose)
 : compose;
// Use redux-thunk as a redux middleware
const enhancer = composeEnhancers(applyMiddleware(thunkMiddleware));
const store = createStore(rootReducer, {}, enhancer);
export default store;
```

```
// Khi đã có redux toolkit 🤣
// store.js
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers'
const store = configureStore({ reducer: rootReducer })
```

- createReducer():

```
// Không có Redux Toolkit
function counterReducer(state = 0, action) {
    switch (action.type) {
      case 'increment':
        return state + action.payload
      case 'decrement':
        return state - action.payload
      default:
        return state
 }
}
```

```
// Có Redux Toolkit
// - Mỗi key là một case
// - Không cần handle default case
const counterReducer = createReducer(0, {
  increment: (state, action) => state + action.payload,
  decrement: (state, action) => state - action.payload
})
```

```
// Một điểm hay nữa là reducer có thể mutate data trực tiếp.
// Bản chất bên dưới họ sử dụng thư viện Immerjs
const todoReducer = createReducer([], {
  addTodo: (state, action) => {
    // 1. Có thể mutate data trực tiếp 🎉
    state.push(action.payload)
  },
  removeTodo: (state, action) => {
    // 2. Hoặc phải trả về state mới
    // CHỨ KO ĐƯỢC cả 1 và 2 nha 😎
    const newState = [...state];
    newState.splice(action.payload, 1);
    return newState;
  }
})
```

- Ngoài ra còn một số hàm: createSlice(), createSelector(), createAsyncThunk(), createEntityAdapter().

3. Setup Redux Toolkit

- Setup Redux store

```
// store.js
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
```

- Bind Redux Provider to App

```
// index.js
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```

- Setup Slice (kết hợp của reducers và actions)

```
// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: { value: { name: '', age: 0, email: '' } },
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },

    logout: (state) => {
      state.value = { name: '', age: 0, email: '' };
    },
  },
});

const { reducer, actions } = userSlice;
export const { login, logout } = actions;
export default reducer;
```

- Connect với store để sài thôi🤣 (using useSelector, useDispatch)

```
// components/LoginLogout.js
import { useDispatch } from 'react-redux';
import { login, logout } from '../features/userSlice';

const LoginLogout = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <button
        onClick={() => {
          dispatch(login({ name: 'Thuc', age: 18, email: 'thuc@gmail.com' }));
        }}
      >
        Login
      </button>

      <button
        onClick={() => {
          dispatch(logout());
        }}
      >
        Logout
      </button>
    </div>
  );
};
```

```
// components/Profile.js
import { useSelector } from 'react-redux';

const Profile = () => {
  const user = useSelector((state) => state.user.value);
  const themeColor = useSelector((state) => state.theme.value);

  return (
    <div style={{ color: themeColor }}>
      <h1>Profile Page</h1>
      <p>Name: {user.name}</p>
      <p>Age: {user.age}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};
```
