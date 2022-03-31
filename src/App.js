import { Link, Outlet } from 'react-router-dom';
import Menu from './components/Menu';
import './App.css';
import useCustomerTools from './composition/useCustomerTools';
function App() {
  const { customer, logout } = useCustomerTools();
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
          {Boolean(customer) ? (
            <a href="# " onClick={logout}>
              logout
            </a>
          ) : (
            <>
              <Link to="/login">login</Link>
              <Link to="/sign-up">sign up</Link>
            </>
          )}
        </div>
        <Link to="/cart">cart</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
