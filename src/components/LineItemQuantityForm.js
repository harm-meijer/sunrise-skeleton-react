import { useCallback, useEffect, useState } from 'react';
import useCartTools from '../composition/useCartTools';

function LineItemQuantityForm({ lineItemId, quantity }) {
  const { changeLine: cl, removeLineItem: rm } =
    useCartTools();
  const [quantity_, setQuantity_] = useState(quantity);
  const changeLine = useCallback(
    () => cl(lineItemId, quantity_),
    [cl, lineItemId, quantity_]
  );
  const removeLineItem = useCallback(
    () => rm(lineItemId),
    [lineItemId, rm]
  );
  useEffect(() => {
    if (quantity_ === '') {
      return;
    }
    changeLine(quantity_);
    if (quantity_ <= 0) {
      removeLineItem();
    }
  }, [changeLine, quantity_, removeLineItem]);
  const increment = () => {
    setQuantity_((q) => q + 1);
  };
  const decrement = () => {
    setQuantity_((q) => q - 1);
  };
  return (
    <div>
      <div>
        <div onClick={decrement}>-</div>
        <input
          min="0"
          type="number"
          name="qtybutton"
          value={quantity_}
          onChange={(e) => setQuantity_(Number(e.targe_))}
        />
        <div onClick={increment}>+</div>
      </div>
    </div>
  );
}
export default LineItemQuantityForm;
