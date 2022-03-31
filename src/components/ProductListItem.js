import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import useCartTools from '../composition/useCartTools';

function ProductListItem({ product }) {
  const { addLine } = useCartTools();

  const addToCart = useCallback(
    (sku, quantity = 1) => addLine(sku, quantity),
    [addLine]
  );

  return (
    <div>
      <button
        onClick={() => addToCart(product.masterVariant.sku)}
      >
        add to cart
      </button>
      <Link
        to={`/product/${product.slug}/${product.masterVariant.sku}`}
      >
        {product.name}
      </Link>
      <pre>{JSON.stringify(product, undefined, 2)}</pre>;
    </div>
  );
}
export default ProductListItem;
