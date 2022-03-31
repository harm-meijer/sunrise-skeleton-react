import useMyOrder from './useMyOrder';
import useMyOrders from './useMyOrders';
import basic from './ct/useCustomerTools';
import { loginToken, logout as lo } from '../apollo/auth';
import { cache } from '../apollo';
import { CUSTOMER } from '../constants';
import { createReactive } from './lib';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
const saveCustomerState = (c) => {
  customerGlobal.setValue(c);
};
const createResetToken = basic.createResetToken;
const updateUser = ({ firstName, lastName, email }) =>
  basic
    .updateUser({
      version: customerGlobal.ref.value.version,
      firstName,
      lastName,
      email,
    })
    .then((result) => {
      saveCustomerState(result.data.updateMyCustomer);
    });
const li = (email, password) =>
  basic
    .login(email, password)
    .then((data) => {
      return loginToken(email, password).then(() => data);
    })
    .then((result) => {
      saveCustomerState(
        result.data.customerSignMeIn.customer
      );
      //reset entire cache, customer may have specific prices
      cache.reset();
      return result;
    });
const customerGlobal = createReactive(
  JSON.parse(localStorage.getItem(CUSTOMER)),
  (newValue) =>
    localStorage.setItem(CUSTOMER, JSON.stringify(newValue))
);
function useCustomerTools() {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(
    customerGlobal.ref.value
  );
  const [showLoggedIn, setShowLoggedIn] = useState(false);
  useEffect(
    () =>
      customerGlobal.addListener((newValue) => {
        setCustomer(newValue);
        setShowLoggedIn(Boolean(newValue));
      }),
    []
  );
  const signup = (form) =>
    basic
      .signup(form)
      .then((data) => {
        return loginToken(form.email, form.password).then(
          () => data
        );
      })
      .then((result) => {
        saveCustomerState(
          result.data.customerSignMeUp.customer
        );
        //reset entire cache, customer may have specific prices
        cache.reset();
        navigate('/user');
        return result;
      });
  const resetPassword = ({ token, newPassword }) =>
    basic
      .resetPassword({ token, newPassword })
      .then(() => navigate('/login'));

  const logout = () => {
    lo();
    customerGlobal.setValue(null);
    //reset entire cache, customer may have had specific prices
    cache.reset();
    //@todo: go to login page
  };
  const login = (email, password) =>
    li(email, password).then(() => navigate('/user'));
  const returnItems = (id, version, items) => {
    return basic
      .returnItems(id, version, items)
      .then(() => {
        cache.evict({ id: 'orders' });
        cache.gc();
        //@todo: go to order with id
      });
  };
  const updateMyCustomerPassword = ({
    currentPassword,
    newPassword,
  }) =>
    basic
      .updateMyCustomerPassword({
        currentPassword,
        newPassword,
        version: customerGlobal.ref.value.version,
      })
      .then((result) => {
        const c = result.data.customerChangeMyPassword;
        saveCustomerState(c);
        return loginToken(c.email, newPassword);
      })
      .then(
        () => 88
        //@todo: go to user profile
      );
  const gotoResetToken = (token) =>
    navigate(`/reset-password/${token}`);
  //@todo: get token from route
  const { token } = useParams() || {};
  return {
    token,
    login,
    signup,
    showLoggedIn,
    customer,
    updateUser,
    logout,
    createResetToken,
    resetPassword,
    useMyOrders,
    useMyOrder,
    returnItems,
    gotoResetToken,
    updateMyCustomerPassword,
  };
}
export default useCustomerTools;
