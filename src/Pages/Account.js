import { useState } from 'react';
import useCustomerTools from '../composition/useCustomerTools';

function Account() {
  const tools = useCustomerTools();
  const [form, setForm] = useState({
    ...tools.customer,
  });
  const [error, setError] = useState(null);
  const updateCustomerProfile = (e) => {
    e.preventDefault();
    return tools
      .updateUser(form)
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
      {Boolean(error) ? (
        <pre>{JSON.stringify(error, undefined, 2)}</pre>
      ) : null}
      <div>
        <form onSubmit={updateCustomerProfile}>
          <div>
            <div>
              <div>
                <label>
                  firstName
                  <input
                    value={form.firstName}
                    onChange={change('firstName')}
                    type="text"
                  />
                </label>
              </div>
            </div>
            <div>
              <div>
                <label>
                  lastName
                  <input
                    value={form.lastName}
                    onChange={change('lastName')}
                    type="text"
                  />
                </label>
              </div>
            </div>
          </div>
          <div>
            <label>
              email
              <input
                value={form.email}
                onChange={change('email')}
                type="email"
              />
            </label>
          </div>
          <div>
            <button type="submit">save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Account;
