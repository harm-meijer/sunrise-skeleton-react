import { useCallback, useState } from 'react';
import useCustomerTools from '../composition/useCustomerTools';

function ResetPassword() {
  const [form, setForm] = useState({ newPassword: '' });
  const [error, setError] = useState(null);
  const { resetPassword: rp, token } = useCustomerTools();
  const resetPassword = (e) => {
    e.preventDefault();
    rp({
      token,
      newPassword: form.newPassword,
    }).catch((error) => setError(error));
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
      <form onSubmit={resetPassword}>
        <input
          type="password"
          value={form.newPassword}
          onChange={change('newPassword')}
        />
        <input type="submit" value="reset" />
      </form>
    </div>
  );
}
export default ResetPassword;
