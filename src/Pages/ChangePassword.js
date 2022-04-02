import { useState } from 'react';
import useCustomerTools from '../composition/useCustomerTools';

function ChangePassword() {
  const tools = useCustomerTools();
  const [form, setForm] = useState({
    currentPassword: 'p@ssword',
    newPassword: '1234',
  });
  const [error, setError] = useState(null);
  const updateCustomerPassword = (e) => {
    e.preventDefault();
    tools
      .updateMyCustomerPassword(form)
      .then(() => {
        setForm({});
      })
      .catch((error) => setError(error));
  };
  const change = (field) => (e) => {
    setForm(
      (form) => ({
        ...form,
        [field]: e.target.value,
      }),
      []
    );
  };
  return (
    <div>
      <h3>title</h3>
      <div>
        <form onSubmit={updateCustomerPassword}>
          {Boolean(error) ? (
            <pre>{JSON.stringify(error, undefined, 2)}</pre>
          ) : null}
          <div>
            <label>
              current password
              <input
                value={form.currentPassword}
                onChange={change('currentPassword')}
                type="password"
              />
            </label>
          </div>
          <div>
            <label>new password</label>
            <input
              value={form.newPassword}
              onChange={change('newPassword')}
              type="password"
            />
          </div>
          <div>
            <button type="submit">update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default ChangePassword;
