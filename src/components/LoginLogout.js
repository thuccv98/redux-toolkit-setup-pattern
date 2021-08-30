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

export default LoginLogout;
