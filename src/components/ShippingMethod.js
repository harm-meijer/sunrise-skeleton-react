import { useEffect, useRef, useState } from 'react';
import useCartTools from '../composition/useCartTools';
import useShippingMethods from '../composition/useShippingMethods';
import BaseMoney from './BaseMoney';

function ShippingMethod({ updateShipping, cart }) {
  const { total, loading, error, shippingMethods } =
    useShippingMethods();
  const [
    selectedShippingMethod,
    setSelectedShippingMethod,
  ] = useState(
    cart?.shippingInfo?.shippingMethod?.methodId
  );
  const prevShipping = useRef(selectedShippingMethod);
  const { setShippingMethod } = useCartTools();
  useEffect(() => {
    function setPref() {
      prevShipping.current = selectedShippingMethod;
    }
    if (!selectedShippingMethod) {
      return setPref;
    }
    if (prevShipping.current === selectedShippingMethod) {
      return setPref;
    }
    setShippingMethod(selectedShippingMethod);
    return setPref;
  }, [setShippingMethod, selectedShippingMethod]);
  useEffect(() => {
    if (
      !cart?.shippingInfo?.shippingMethod?.methodId &&
      Boolean(shippingMethods?.length)
    ) {
      setSelectedShippingMethod(
        (
          shippingMethods.find(
            ({ isDefault }) => isDefault
          ) || shippingMethods[0]
        ).methodId
      );
    }
  }, [
    cart?.shippingInfo?.shippingMethod?.methodId,
    setSelectedShippingMethod,
    shippingMethods,
  ]);
  const price = (shippingMethod) => {
    //zone rates not for this country will be filtered out by graphql
    //  shipping rates are not.
    const rate = shippingMethod?.zoneRates
      ?.flatMap(({ shippingRates }) => shippingRates)
      .find(({ isMatching }) => isMatching);
    return cart.totalPrice.centAmount >
      (rate?.freeAbove?.centAmount || Infinity)
      ? null
      : rate?.price;
  };
  return (
    <div>
      {shippingMethods
        ? shippingMethods.map((shippingMethod) => (
            <div key={shippingMethod.methodId}>
              <input
                checked={
                  shippingMethod.methodId ===
                  selectedShippingMethod
                }
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedShippingMethod(
                      shippingMethod.methodId
                    );
                  }
                }}
                type="radio"
                value={shippingMethod.methodId}
                name="shipping_method"
              />
              <label>
                <span>{shippingMethod.name}</span>
                <BaseMoney money={price(shippingMethod)} />
              </label>
              <div>
                <p>{shippingMethod.localizedDescription}</p>
              </div>
            </div>
          ))
        : null}
    </div>
  );
}
export default ShippingMethod;
