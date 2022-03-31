import { useState } from 'react';
import LineItemInfo from './LineItemInfo';

function CartLikeContentDetail({
  cart,
  onChangeSelectedItems,
  editable = true,
  selectable = false,
}) {
  const [selectedReturnItems, setSelectedReturnItems] =
    useState([]);
  const selectReturnItem = (item) => {
    setSelectedReturnItems((selectedReturnItems) => {
      const newItems = selectedReturnItems
        .filter(({ id }) => id !== item.id)
        .concat(item);
      onChangeSelectedItems(newItems);
      return newItems;
    });
  };
  const unselectReturnItem = (item) => {
    setSelectedReturnItems((selectedReturnItems) => {
      const newItems = selectedReturnItems.value.filter(
        ({ id }) => id !== item.id
      );
      onChangeSelectedItems(newItems);
      return newItems;
    });
  };

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
          />
        ))}
        {/* <LineItemInfo
      v-for="lineItem in cart.lineItems"
      @select-return-item="selectReturnItem"
      @unselect-return-item="unselectReturnItem"
    /> */}
      </table>
    </div>
  );
}
export default CartLikeContentDetail;
