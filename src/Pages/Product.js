import { useCallback, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import VariantSelector from '../components/VariantSelector';
import useCartTools from '../composition/useCartTools';
import useProductTools from '../composition/useProductTools';

function Product() {
  const { addLine } = useCartTools();
  const { sku } = useParams();
  const addToCart = useCallback(
    () => addLine(sku, 1),
    [addLine, sku]
  );
  const { allVariants } = useProductTools(true);

  return allVariants ? (
    <div>
      <VariantSelector
        allVariants={allVariants}
        sku={sku}
      />
      <button onClick={addToCart}>Add to cart</button>
    </div>
  ) : null;
}
export default Product;
