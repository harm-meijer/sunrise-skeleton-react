import { useCallback, useState } from 'react';
import useCustomerTools from '../composition/useCustomerTools';
import useAccessRules from '../composition/useAccessRules';
import { Link } from 'react-router-dom';

function Login() {
  const { showResetPassword } = useAccessRules();
  const [form, setForm] = useState({
    email: 'emma.noor@commercetools.com',
    password: 'p@ssword',
  });
  const [loginError, setLoginError] = useState(null);
  const tools = useCustomerTools();
  const customerSignMeIn = (e) => {
    e.preventDefault();
    tools
      .login(form.email, form.password)
      .catch((error) => {
        setLoginError(error);
      });
  };
  const change = useCallback(
    (field) => (e) =>
      setForm((form) => ({
        ...form,
        [field]: e.target.value,
      })),
    []
  );
  return (
    <div>
      {Boolean(loginError) ? (
        <div>
          <pre>
            {JSON.stringify(loginError, undefined, 2)}
          </pre>
        </div>
      ) : null}
      <form onSubmit={customerSignMeIn}>
        <input
          type="email"
          value={form.email}
          onChange={change('email')}
        />
        <input
          type="password"
          value={form.password}
          onChange={change('password')}
        />
        {showResetPassword ? (
          <Link to="/forgot-password">forgot password</Link>
        ) : null}
        <input type="submit" value="login" />
      </form>
    </div>
  );
}
export default Login;
