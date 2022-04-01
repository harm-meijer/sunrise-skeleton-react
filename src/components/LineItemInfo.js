import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useCartTools from '../composition/useCartTools';
import BasePrice from './BasePrice';
import LineItemQuantityForm from './LineItemQuantityForm';
import Remove from './Remove';
const defaultChanged = () => 88;
function LineItemInfo({
  lineItem,
  extended = true,
  editable = true,
  selectable = false,
  selectionChanged = defaultChanged,
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
  const {
    productRoute,
    displayedImageUrl,
    lineItemAttr,
    total,
  } = useCartTools();
  const onChange = useCallback((e) => {
    setSelected(e.target.checked);
  }, []);
  const changeQuantity = useCallback((e) => {
    const quantity = e.target.value;
    setItem((item) => ({ ...item, quantity }));
  }, []);
  useEffect(() => {
    const quantity = Number(item?.quantity);
    if (quantity) {
      selectionChanged({ ...item, quantity }, selected);
    }
  }, [item, selected, selectionChanged]);
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
              onChange={onChange}
              value={lineItem.variant.sku}
              type="checkbox"
              checked={selected}
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
            <span>
              <BasePrice price={lineItem.price} />
            </span>
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
              <div>
                <input
                  onChange={changeQuantity}
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
            <span>
              <BasePrice price={total(lineItem)} />
            </span>
          </td>
        ) : null}
      </tr>
    </tbody>
  );
}
export default LineItemInfo;
