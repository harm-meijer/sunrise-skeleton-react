import { useState } from 'react';
import useCartTools from '../composition/useCartTools';
import BasePrice from './BasePrice';
import ShippingMethod from './ShippingMethod';

function OrderOverview({ cart }) {
  const { lineItemAttr, total, subTotal } = useCartTools();
  const [paid, setPaid] = useState(false);
  const [paymentId, setPaymentId] = useState(null);
  const cardPaid = (paymentId) => {
    if (paymentId) {
      setPaymentId(paymentId);
    }
    setPaid(true);
  };
  const updateShippingMethod = (shippingId) => {
    // emit('update-shipping', shippingId);
    //@todo: set shipping id
  };
  const placeOrder = () => {
    // emit('complete-order', paymentId);
    //@todo: set complete order
  };
  return Boolean(cart) ? (
    <div>
      <h3>orderSummary</h3>
      <div>
        <div>
          <div>
            <ul>
              <li>
                product
                <span>total</span>
              </li>
            </ul>
          </div>
          <div>
            {cart.lineItems.map((lineItem) => (
              <div key={lineItem.lineId}>
                <div>
                  <h5>
                    {lineItem.name}
                    {lineItemAttr(lineItem)}
                    <span>× {lineItem.quantity}</span>
                  </h5>
                </div>
                <div>
                  <span>
                    <BasePrice price={total(lineItem)} />
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div>
            <ul>
              <li>
                <b>subtotal</b>
                <span>
                  <BasePrice price={subTotal(cart)} />
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <div>
            <span>shipping</span>
          </div>
          <ShippingMethod
            updateShipping={updateShippingMethod}
            cart={cart}
          />
        </div>
        {/* <PaymentMethod
      v-bind:amount="cart.totalPrice"
      v-on:card-paid="cardPaid"
      :key="cart.totalPrice.centAmount"
    /> */}
        <div>
          <ul>
            <li>
              total
              <span>
                <BasePrice
                  price={{
                    value: cart.totalPrice,
                  }}
                />
              </span>
            </li>
          </ul>
        </div>
        {paid ? (
          <div>
            <a onClick={placeOrder} href="# ">
              placeOrder
            </a>
          </div>
        ) : null}
      </div>
    </div>
  ) : null;
}
export default OrderOverview;
