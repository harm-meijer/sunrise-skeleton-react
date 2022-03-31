import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useCartTools from '../composition/useCartTools';
import LineItemQuantityForm from './LineItemQuantityForm';
import Remove from './Remove';

function LineItemInfo({
  lineItem,
  extended = true,
  editable = true,
  selectable = false,
  selectionChanged,
}) {
  const [selected, setSelected] = useState(false);
  const [item, setItem] = useState(() =>
    selectable
      ? {
          lineItemId: lineItem.lineId,
          quantity: lineItem.quantity,
        }
      : null
  );
  useEffect(() => {
    if (selected === true) {
      // emit('select-return-item', item.value);
      //@todo: call selecitonChanged?
    }
    if (selected === false) {
      // emit('unselect-return-item', item.value);
      //@todo: call selectionChanged
    }
  }, [selected]);
  const { productRoute, displayedImageUrl, lineItemAttr } =
    useCartTools();
  return (
    <tbody>
      <tr>
        {editable ? (
          <td>
            <Remove lineItemId={lineItem.lineId} />
          </td>
        ) : null}
        {selectable ? (
          <td>
            <input
              // onChange?
              value={lineItem.variant.sku}
              type="checkbox"
            />
          </td>
        ) : null}
        <td>
          <Link to={productRoute(lineItem)}>
            <img
              src={displayedImageUrl(lineItem.variant)}
              alt={lineItem.name}
              style={{ width: '100px' }}
            />
          </Link>
        </td>
        <td>
          <Link to={productRoute(lineItem)}>
            {lineItem.name}
          </Link>
          <b>{lineItemAttr(lineItem)}</b>
          <span>{lineItem.variant.sku}</span>
        </td>
        {!selectable ? (
          <td>
            <span>BasePrice</span>
          </td>
        ) : null}
        <td>
          {editable ? (
            <LineItemQuantityForm
              lineItemId={lineItem.lineId}
              quantity={lineItem.quantity}
            />
          ) : null}
          {selectable ? (
            <div>
              <div class="cart-plus-minus">
                <input
                  // v-model.number="item.quantity"
                  //onChange
                  value={item.quantity}
                  type="number"
                />
              </div>
            </div>
          ) : null}
          {!editable && !selectable ? (
            <div>
              <span>{lineItem.quantity}</span>
            </div>
          ) : null}
        </td>
        {!selectable ? (
          <td>
            <span>BasePrice</span>
          </td>
        ) : null}
      </tr>
    </tbody>
  );
}
export default LineItemInfo;
