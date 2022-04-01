import { useCallback, useState } from 'react';
import LineItemInfo from './LineItemInfo';
const defaultOnChange = () => 88;
function CartLikeContentDetail({
  cart,
  editable = true,
  selectable = false,
  selectionChanged = defaultOnChange,
}) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            {selectable ? <th></th> : null}
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
            selectionChanged={selectionChanged}
          />
        ))}
      </table>
    </div>
  );
}
export default CartLikeContentDetail;
