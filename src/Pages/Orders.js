import { useMemo } from 'react';
import BaseMoney from '../components/BaseMoney';
import useCustomerTools from '../composition/useCustomerTools';

function Orders() {
  const tools = useCustomerTools();
  const { setPage, loading, orders, total, page } =
    tools.useMyOrders();
  const orderListNotEmpty = useMemo(() => {
    return Boolean(orders?.length);
  }, [orders]);

  function paymentInfo(order) {
    return order?.paymentInfo?.payments?.[0]?.paymentStatus
      ?.interfaceCode
      ? order?.paymentInfo?.payments?.[0]?.paymentStatus
          ?.interfaceCode
      : '';
  }

  return (
    <div>
      <h3>Orders</h3>
      {orderListNotEmpty ? (
        <div>
          <table>
            <thead>
              <tr>
                <th>date</th>
                <th>total</th>
                <th>payment status</th>
                <th>shipment state</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.orderId}>
                  <td>{order.createdAt}</td>
                  <td>
                    <BaseMoney money={order.totalPrice} />
                  </td>
                  <td>{paymentInfo(order)}</td>
                  <td>{order.shipmentState}</td>
                  <td>
                    @todo: create link to order detail
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* @todo: need pagination */}
        </div>
      ) : null}
      {!orderListNotEmpty ? (
        <div>
          <span>no orders</span>
        </div>
      ) : null}
    </div>
  );
}
export default Orders;
