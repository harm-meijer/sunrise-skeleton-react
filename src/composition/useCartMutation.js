import org from './ct/useCartMutation';
import useCurrency from './useCurrency';
import useLocation from './useLocation';
import {
  addLineItem,
  changeCartLineItemQuantity,
  removeLineItem,
  addDiscountCode,
  removeDiscountCode,
  setShippingMethod,
  setBillingAddress,
  setShippingAddress,
  createMyOrderFromCart,
} from './ct/useCartMutation';
import useSelectedChannel from './useSelectedChannel';
import { apolloClient, cache } from '../apollo';

export {
  addLineItem,
  changeCartLineItemQuantity,
  removeLineItem,
  addDiscountCode,
  removeDiscountCode,
  setShippingMethod,
  setBillingAddress,
  setShippingAddress,
  createMyOrderFromCart,
};
const useCartMutation = () => {
  const { location } = useLocation();
  const currency = useCurrency();
  return org({ location, currency });
};
export default useCartMutation;

export const useCartActions = () => {
  const { location } = useLocation();
  const { channel } = useSelectedChannel();
  const debounce = (fn, time = 200) => {
    const current = {};
    const check = { current };
    return (...args) => {
      const current = {};
      check.current = current;
      setTimeout(() => {
        if (check.current === current) {
          fn(...args);
        }
      }, time);
    };
  };
  const { error, mutateCart } = useCartMutation();
  const changeLine = debounce(
    (lineItemId, quantity = 1) => {
      if (!quantity || quantity < 0) {
        return;
      }
      mutateCart(
        changeCartLineItemQuantity(lineItemId, quantity)
      );
    }
  );
  const remove = (lineItemId) => {
    mutateCart(removeLineItem(lineItemId));
  };
  const addLine = (sku, quantity) =>
    mutateCart(addLineItem(sku, quantity, channel?.id));
  const applyDiscount = (code) =>
    mutateCart(addDiscountCode(code));
  const removeDiscount = (codeId) =>
    mutateCart(removeDiscountCode(codeId));
  const setShip = (shippingMethodId) =>
    mutateCart(setShippingMethod(shippingMethodId));

  const setBilling = (address) =>
    mutateCart(setBillingAddress(address));

  const setShipping = (address) =>
    mutateCart(setShippingAddress(address));
  const createMyOrder = ({
    billingAddress,
    shippingAddress,
  }) => {
    const actions = [
      setBillingAddress({
        ...billingAddress,
        country: location,
      }),
      setShippingAddress({
        ...(shippingAddress || billingAddress),
        country: location,
      }),
    ];
    return mutateCart(actions)
      .then(({ data }) => {
        const { id, version } = data.updateMyCart;
        return apolloClient.mutate(
          createMyOrderFromCart(id, version)
        );
      })
      .then(() => {
        cache.evict({ id: 'activeCart' });
        cache.gc();
      });
  };

  return {
    error,
    changeLine,
    removeLineItem: remove,
    applyDiscount,
    removeDiscount,
    addLine,
    setShippingMethod: setShip,
    setBillingAddress: setBilling,
    setShippingAddress: setShipping,
    createMyOrderFromCart: createMyOrder,
  };
};
