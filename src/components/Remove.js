import { useCallback } from 'react';
import useCartTools from '../composition/useCartTools';

function Remove({ lineItemId }) {
  const { removeLineItem: rm } = useCartTools();
  const removeLineItem = useCallback(
    () => rm(lineItemId),
    [lineItemId, rm]
  );
  return (
    <a href="# " onClick={removeLineItem}>
      X
    </a>
  );
}
export default Remove;
