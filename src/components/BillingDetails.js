import { useEffect, useState } from 'react';
import BaseAddressForm from './BaseAddressForm';

function BillingDetails({
  billingAddress,
  shippingAddress,
  updateBillingDetails,
  updateShippingDetails,
}) {
  const [differentAddress, setDifferentAddress] =
    useState(false);
  const [newBillingAddress, setNewBillingAddress] =
    useState(null);
  const [newShippingAddress, setNewShippingAddress] =
    useState(null);

  const unsetBillingAddress = () => {
    setNewBillingAddress(null);
  };
  const updateBillingAddress = (address) => {
    setNewBillingAddress(address);
  };
  const updateShippingAddress = (address) => {
    setNewShippingAddress(address);
  };
  useEffect(() => {
    if (!differentAddress) {
      setNewShippingAddress(null);
    }
  }, [differentAddress]);
  useEffect(() => {
    // emit('update-billing-details', newBillingAddress);
    //@todo: call change method
    console.log('never happens', newBillingAddress);
  }, [newBillingAddress]);
  useEffect(() => {
    // emit(
    //   'update-shipping-details',
    //   newShippingAddress.value
    // );
    console.log('updated shipping:', shippingAddress);
    //@todo: call update
  }, [shippingAddress]);
  return (
    <div>
      <h3>billingDetails</h3>
      <BaseAddressForm
        updateAddress={updateBillingAddress}
        address={billingAddress}
      />
      <div>
        <input
          checked={differentAddress}
          onChange={(e) =>
            setDifferentAddress(e.target.checked)
          }
          type="checkbox"
        />
        <span>differentAddress</span>
      </div>
      {differentAddress ? (
        <div>
          <BaseAddressForm
            updateAddress={updateShippingAddress}
            address={shippingAddress}
          />
        </div>
      ) : null}
    </div>
  );
}
export default BillingDetails;
