import { useCallback, useState } from 'react';
import useCustomerTools from '../composition/useCustomerTools';
import useAccessRules from '../composition/useAccessRules';
import { Link } from 'react-router-dom';

function SignUp() {
  const [form, setForm] = useState({
    firstName: 'first',
    lastName: 'last',
    email: 'first.last@commercetools.com',
    password: 'p@ssword',
  });
  const [SignUpError, setSignUpError] = useState(null);
  const tools = useCustomerTools();
  const customerSignMeUp = (e) => {
    e.preventDefault();
    tools
      .signup(form)
      .catch((error) => setSignUpError(error));
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
      {Boolean(SignUpError) ? (
        <div>
          <pre>
            {JSON.stringify(SignUpError, undefined, 2)}
          </pre>
        </div>
      ) : null}
      <form onSubmit={customerSignMeUp}>
        <input
          type="firstName"
          value={form.firstName}
          onChange={change('firstName')}
        />
        <input
          type="lastName"
          value={form.lastName}
          onChange={change('lastName')}
        />
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
        <input type="submit" value="sign up" />
      </form>
    </div>
  );
}
export default SignUp;
