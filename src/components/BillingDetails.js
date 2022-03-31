import { useCallback, useEffect, useState } from 'react';
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

  const updateBillingAddress = useCallback((address) => {
    setNewBillingAddress(address);
  }, []);
  const updateShippingAddress = useCallback((address) => {
    setNewShippingAddress(address);
  }, []);
  useEffect(() => {
    if (!differentAddress) {
      setNewShippingAddress(null);
    }
  }, [differentAddress]);
  useEffect(() => {
    updateBillingDetails(newBillingAddress);
  }, [newBillingAddress, updateBillingDetails]);
  useEffect(() => {
    updateShippingDetails(newShippingAddress);
  }, [newShippingAddress, updateShippingDetails]);
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
