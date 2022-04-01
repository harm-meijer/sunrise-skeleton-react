import useCustomerTools from '../composition/useCustomerTools';
import useAccessRules from '../composition/useAccessRules';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import CartLikeContentDetail from '../components/CartLikeContentDetail';
import BaseMoney from '../components/BaseMoney';
import BaseAddress from '../components/BaseAddress';

function Order() {
  const { showReturnItemButton } = useAccessRules();
  const tools = useCustomerTools();
  const { loading, order } = tools.useMyOrder();
  const subtotal = useMemo(() => {
    //@todo: is this not already done in cart tools?
    if (order) {
      const { currencyCode, fractionDigits } =
        order.totalPrice;
      return {
        centAmount: order.lineItems.reduce(
          (acc, li) => acc + li.totalPrice.centAmount,
          0
        ),
        currencyCode,
        fractionDigits,
      };
    }
    return null;
  }, [order]);
  const paymentInfo = useMemo(() => {
    return order?.paymentInfo?.payments?.[0]?.paymentStatus
      ?.interfaceCode
      ? order?.paymentInfo?.payments?.[0]?.paymentStatus
          ?.interfaceCode
      : '';
  }, [order?.paymentInfo?.payments]);

  return (
    <div>
      {order ? (
        <div>
          <h3>title</h3>
          <div>
            <div>
              {order.orderNumber ? (
                <span>
                  orderNumber
                  <br />
                </span>
              ) : null}
              date
            </div>
            <div>
              {order.orderNumber ? (
                <span>
                  {order.orderNumber}
                  <br />
                </span>
              ) : null}
              {order.createdAt}
            </div>
            <div>
              {showReturnItemButton ? (
                <Link to={`../return/${order.id}`}>
                  <button>return</button>
                </Link>
              ) : null}
            </div>
          </div>
          <div>
            <div>
              <b>shippingAddress</b>
              <BaseAddress
                address={order.shippingAddress}
              />
            </div>
            <div>
              <b>billingAddress</b>
              <BaseAddress address={order.billingAddress} />
            </div>
          </div>
          <div>
            <div>
              <b>shippingMethod</b>
              <p>
                {order.shippingInfo?.shippingMethod?.name}-
                {
                  order.shippingInfo?.shippingMethod
                    ?.localizedDescription
                }
              </p>
            </div>
            <div>
              <b>paymentDetails</b>
              <p>{paymentInfo}</p>
            </div>
          </div>
          <div>
            <CartLikeContentDetail
              editable={false}
              cart={order}
            />
          </div>
          <div>
            <div>
              <span>subtotal</span>
              <span>
                <BaseMoney money={subtotal} />
              </span>
            </div>
            <div>
              <p>shipping</p>
              <span>
                <BaseMoney
                  money={order.shippingInfo?.price}
                />
              </span>
            </div>
            {order.discountCodes.length > 0 ? (
              <div>
                <p>appliedDiscounts</p>
                {order.discountCodes.map((discount) => (
                  <p key={discount.discountCode.id}>
                    {discount.discountCode.name}
                  </p>
                ))}
              </div>
            ) : null}
          </div>
          <div>
            <div>
              <span>total</span>
              <span>
                <BaseMoney money={order.totalPrice} />
              </span>
            </div>
          </div>
        </div>
      ) : null}
      {!loading && !order ? (
        <div>
          <h1>notFound</h1>
        </div>
      ) : null}
    </div>
  );
}
export default Order;
