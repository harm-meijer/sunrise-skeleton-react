import { useEffect, useState } from 'react';

function PaymentMethod({ cartPaid }) {
  const [paymentMethod, setPaymentMethod] =
    useState('card');
  useEffect(() => {
    cartPaid(paymentMethod);
  }, [cartPaid, paymentMethod]);
  return (
    <span>
      <div>
        <div>
          <span>paymentMethod</span>
        </div>
      </div>
      <div>
        <div>
          <label>
            creditCard
            <input
              type="radio"
              value="card"
              checked={paymentMethod === 'card'}
              onChange={(e) => {
                if (e.target.checked) {
                  setPaymentMethod('card');
                }
              }}
            />
          </label>
        </div>
        <div>
          <label>
            PayPal
            <input
              type="radio"
              value="paypal"
              checked={paymentMethod === 'paypal'}
              onChange={(e) => {
                if (e.target.checked) {
                  setPaymentMethod('paypal');
                }
              }}
            />
          </label>
        </div>
      </div>
    </span>
  );
}
export default PaymentMethod;
