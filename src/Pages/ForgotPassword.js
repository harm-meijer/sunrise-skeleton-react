import { useCallback, useState } from 'react';
import useCustomerTools from '../composition/useCustomerTools';

function ForgotPassword() {
  const [form, setForm] = useState({
    email: 'emma.noor@commercetools.com',
  });
  const [error, setError] = useState(null);

  const { createResetToken, gotoResetToken } =
    useCustomerTools();

  const createToken = (e) => {
    e.preventDefault();
    return createResetToken(form.email)
      .then((result) =>
        gotoResetToken(
          result.data.customerCreatePasswordResetToken.value
        )
      )
      .catch((error) => setError(error));
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
      {Boolean(error) ? (
        <div>
          <pre>{JSON.stringify(error, undefined, 2)}</pre>
        </div>
      ) : null}
      <form onSubmit={createToken}>
        <input
          type="email"
          value={form.email}
          onChange={change('email')}
        />
        <input type="submit" value="reset" />
      </form>
    </div>
  );
}
export default ForgotPassword;
