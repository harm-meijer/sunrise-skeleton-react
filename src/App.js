import { Link, Outlet } from 'react-router-dom';
import Menu from './components/Menu';
import './App.css';
function App() {
  return (
    <div>
      <h1>App</h1>
      <nav
        style={{
          borderBottom: 'solid 1px',
          paddingBottom: '1rem',
        }}
      >
        <Menu />
        <div>
          <Link to="/login">login</Link>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
