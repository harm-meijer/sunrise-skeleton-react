import { useEffect, useRef, useState } from 'react';

function BaseAddressForm({ address, updateAddress }) {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    streetName: '',
    additionalStreetInfo: '',
    postalCode: '',
    city: '',
    phone: '',
    email: '',
    ...address,
  });
  const prevFrom = useRef(form);
  useEffect(() => {
    function setChanged() {
      prevFrom.current = form;
    }
    console.log('same:', prevFrom.current === form);
    //@todo: dispatch?
    // emit(
    //   'update-address',
    //   JSON.parse(JSON.stringify(form))
    // );
    return setChanged;
  }, [form]);
  const change = (field) => (e) => {
    setForm((form) => ({
      ...form,
      [field]: e.target.value,
    }));
  };
  return (
    <div>
      <div>
        <div>
          <label>firstName</label>
          <input
            value={form.firstName}
            onChange={change('firstName')}
            type="text"
          />
        </div>
      </div>
      <div>
        <div>
          <label>lastName</label>
          <input
            value={form.lastName}
            onChange={change('lastName')}
            type="text"
          />
        </div>
      </div>

      <div>
        <div>
          <label>address</label>
          <input
            value={form.streetName}
            onChange={change('streetName')}
            type="text"
          />
          <input
            value={form.additionalStreetInfo}
            onChange={change('additionalStreetInfo')}
            type="text"
          />
        </div>
      </div>
      <div>
        <div>
          <label>postCode</label>
          <input
            value={form.postalCode}
            onChange={change('postalCode')}
            type="text"
          />
        </div>
      </div>
      <div>
        <div>
          <label>city</label>
          <input
            value={form.city}
            onChange={change('city')}
            type="text"
          />
        </div>
      </div>
      <div>
        <div>
          <label>country</label>
        </div>
      </div>
      <div>
        <div>
          <label>phone</label>
          <input
            value={form.phone}
            onChange={change('phone')}
            type="tel"
          />
        </div>
      </div>
      <div>
        <div>
          <label>email</label>
          <input
            value={form.email}
            onChange={change('email')}
            type="email"
          />
        </div>
      </div>
    </div>
  );
}

export default BaseAddressForm;
