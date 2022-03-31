import { useState } from 'react';
import useCartTools from '../composition/useCartTools';

function AddDiscountCodeForm() {
  const { applyDiscount: ad } = useCartTools();
  const [form, setForm] = useState({
    code: 'CODE2019',
  });
  const [error, setError] = useState(null);
  const applyDiscount = () => {
    ad(form.code).catch((error) => setError(error));
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
      {Boolean(error) ? (
        <pre>{JSON.stringify(error, undefined, 2)}</pre>
      ) : null}
      <div>
        <input
          onChange={change('code')}
          placeholder="code"
          type="text"
          value={form.code}
        />
        <input
          type="button"
          value="apply discount"
          onClick={applyDiscount}
        />
      </div>
    </div>
  );
}
export default AddDiscountCodeForm;
