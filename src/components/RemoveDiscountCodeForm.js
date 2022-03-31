import useCartTools from '../composition/useCartTools';

function RemoveDiscountCodeForm({ codeId }) {
  const { removeDiscount: rd } = useCartTools();
  const removeDiscount = () => rd(codeId);

  return (
    <a href="# " onClick={removeDiscount}>
      X
    </a>
  );
}
export default RemoveDiscountCodeForm;
