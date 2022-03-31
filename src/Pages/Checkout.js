import { useCallback, useEffect, useState } from 'react';
import useCart from '../composition/useCart';
import { Link, useNavigate } from 'react-router-dom';
import useCartTools from '../composition/useCartTools';
import BillingDetails from '../components/BillingDetails';

function Checkout() {
  const { cartNotEmpty } = useCartTools();
  const navigate = useNavigate();
  const [shippingMethod, setShippingMethod] =
    useState(null);
  const [billingAddress, setBillingAddress] =
    useState(null);
  const [shippingAddress, setShippingAddress] =
    useState(null);
  const [orderComplete, setOrderComplete] = useState(false);
  const [error, setError] = useState(null);
  const { cart, loading } = useCart();
  const cartTools = useCartTools();
  const placeOrder = () => {
    return cartTools
      .createMyOrderFromCart({
        billingAddress,
        shippingAddress,
      })
      .then(
        () => setOrderComplete(true),
        (e) => {
          setError(e);
        }
      );
  };
  useEffect(() => {
    if (!orderComplete && !cart && !loading) {
      navigate('/');
    }
  }, [cart, loading, navigate, orderComplete]);
  const updateBilling = useCallback((billingDetails) => {
    setBillingAddress(billingDetails);
  }, []);
  const updateShipping = useCallback((shippingDetails) => {
    setShippingAddress(shippingDetails);
  }, []);
  const updateShippingMethod = useCallback((shippingId) => {
    setShippingMethod(shippingId);
  }, []);
  return (
    <span>
      {cartNotEmpty(cart) ? (
        <div>
          <div>
            <div>
              <div>
                <div>
                  <BillingDetails
                    billingAddress={billingAddress}
                    shippingAddress={shippingAddress}
                    updateBillingDetails={updateBilling}
                    updateShippingDetails={updateShipping}
                  />
                </div>
                <div>
                  {/* <OrderOverview
              @update-shipping="updateShippingMethod"
              @complete-order="placeOrder"
              :showError="showError"
              :cart="cart"
            /> */}
                  {Boolean(error) ? (
                    <pre>
                      {JSON.stringify(error, undefined, 2)}
                    </pre>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {orderComplete ? (
        <div>
          <div>
            <div>
              <h2>thankYou</h2>
              <Link to="/">Continue Shopping</Link>
            </div>
          </div>
        </div>
      ) : null}
    </span>
  );
}
export default Checkout;
