import { Link, Outlet } from 'react-router-dom';

function User() {
  return (
    <div>
      <div>
        <Link to="orders">orders</Link>
      </div>
      <div>
        <Link to="changepassword">Change password</Link>
      </div>
      <Outlet />
    </div>
  );
}
export default User;
