import './App.css';
import ChangeColor from './components/ChangeColor';
import LoginLogout from './components/LoginLogout';
import Profile from './components/Profile';

function App() {
  return (
    <div className="App">
      <Profile />
      <LoginLogout />
      <ChangeColor />
    </div>
  );
}

export default App;
