import { useCallback, useState } from 'react';
import CartLikeContentDetail from '../components/CartLikeContentDetail';
import useCustomerTools from '../composition/useCustomerTools';

function Return() {
  const [selectedItems, setSelectedItems] = useState([]);
  const tools = useCustomerTools();
  const { loading, order } = tools.useMyOrder();
  const selectionChanged = useCallback((item, selected) => {
    setSelectedItems((selectedItems) =>
      selectedItems
        .filter(
          ({ lineItemId }) => lineItemId !== item.lineItemId
        )
        .concat(selected ? item : [])
    );
  }, []);
  function submitReturn() {
    if (selectedItems.length === 0) {
      alert('Nothing selected');
    } else {
      return tools.returnItems(
        order.id,
        order.version,
        selectedItems
      );
    }
  }
  return (
    <div>
      {order ? (
        <div>
          <h3>title</h3>
          <div>
            <CartLikeContentDetail
              editable={false}
              selectable={true}
              cart={order}
              selectionChanged={selectionChanged}
            />
          </div>
          <button onClick={submitReturn}>return</button>
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
export default Return;
