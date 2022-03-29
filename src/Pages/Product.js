import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import useCartTools from '../composition/useCartTools';

function Product() {
  const { addLine } = useCartTools();
  const { sku } = useParams();
  const addToCart = useCallback(
    () => addLine(sku, 1),
    [addLine, sku]
  );
  //@todo: variant selector needed
  return (
    <div>
      <button onClick={addToCart}>Add to cart</button>
    </div>
  );
}
export default Product;
