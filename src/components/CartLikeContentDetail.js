import { useCallback, useState } from 'react';
import LineItemInfo from './LineItemInfo';
const defaultOnChange = () => 88;
function CartLikeContentDetail({
  cart,
  editable = true,
  selectable = false,
  onChangeSelectedItems = defaultOnChange,
}) {
  const [selectedReturnItems, setSelectedReturnItems] =
    useState([]);
  const selectReturnItem = useCallback(
    (item) => {
      setSelectedReturnItems((selectedReturnItems) => {
        const newItems = selectedReturnItems
          .filter(({ id }) => id !== item.id)
          .concat(item);
        onChangeSelectedItems(newItems);
        return newItems;
      });
    },
    [onChangeSelectedItems]
  );
  const unselectReturnItem = useCallback(
    (item) => {
      setSelectedReturnItems((selectedReturnItems) => {
        const newItems = selectedReturnItems.filter(
          ({ id }) => id !== item.id
        );
        onChangeSelectedItems(newItems);
        return newItems;
      });
    },
    [onChangeSelectedItems]
  );

  return (
    <div>
      <table>
        <thead>
          <tr>
            {selectable ? (
              <th style="width: 10%"></th>
            ) : null}
            {editable ? <th></th> : null}
            <th></th>
            <th>description</th>
            {!selectable ? <th>price</th> : null}
            <th>quantity</th>
            {!selectable ? <th>total</th> : null}
          </tr>
        </thead>
        {cart.lineItems.map((lineItem) => (
          <LineItemInfo
            editable={editable}
            selectable={selectable}
            key={lineItem.lineId}
            lineItem={lineItem}
            selectReturnItem={selectReturnItem}
            unSelectReturnItem={unselectReturnItem}
          />
        ))}
      </table>
    </div>
  );
}
export default CartLikeContentDetail;
