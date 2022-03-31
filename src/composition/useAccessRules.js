import { useEffect, useState } from 'react';
import config from '../sunrise.config';
import useCart from './useCart';
const canShowStoreSelector = (cart) => () => {
  /**
   * To get channels the scope view_products is needed
   * This is a security risk because all clients can see unpublished products
   * If you want to select stores then you have to use a proxy or BFF or
   * run the risk of clients hacking access to unpublished products
   **/
  return (
    cart === null &&
    (config.ct.auth.scope.includes('view_products') ||
      config.ct.auth.scope.includes('manage_project'))
  );
};
const canShowLocationSelector = (cart) => () =>
  cart === null;
const canShowReturnItemButton = () => {
  /**
   * To return an item you need to update the order, there is no update my order scope
   * so to return an item you need access to all orders, including orders that are not
   * yours. So to return an item you need to implement it with proxy or BFF that
   * checks ownership of the order
   */
  return (
    config.ct.auth.scope.includes('manage_orders') ||
    config.ct.auth.scope.includes('manage_project')
  );
};
const canShowResetPassword = () => {
  /**
   * To request a reset password token you need manage_customers this is done
   * through a proxy or BFF that will email that token, sunrise is connecting
   * directly to commercetools so if you want this to work you need the client
   * to have manage_customers scope. Do not do this in production, this is only
   * for demo purposes
   */
  return (
    config.ct.auth.scope.includes('manage_customers') ||
    config.ct.auth.scope.includes('manage_project')
  );
};
function useAccessRules() {
  const { cart } = useCart();
  const [showReturnItemButton, setShowReturnItemButton] =
    useState(canShowReturnItemButton);
  useEffect(() => {
    setShowReturnItemButton(canShowReturnItemButton());
  }, []);
  const [showStoreSelector, setShowStoreSelector] =
    useState(canShowStoreSelector(cart));
  useEffect(() => {
    setShowStoreSelector(canShowStoreSelector(cart)());
  }, [cart]);
  const [showLocationSelector, setShowLocationSelector] =
    useState(canShowLocationSelector(cart));
  useEffect(() => {
    setShowLocationSelector(
      canShowLocationSelector(cart)()
    );
  }, [cart]);
  const [showResetPassword, setShowResetPassword] =
    useState(canShowResetPassword);
  useEffect(() => {
    setShowResetPassword(canShowResetPassword());
  }, []);
  return {
    showResetPassword,
    showStoreSelector,
    showLocationSelector,
    showReturnItemButton,
  };
}
export default useAccessRules;
