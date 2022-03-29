import { useCallback } from "react";
import useCartTools from "../composition/useCartTools";

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
      <pre>{JSON.stringify(product, undefined, 2)}</pre>;
    </div>
  );
  //@todo: need image and price component
}
export default ProductListItem;
