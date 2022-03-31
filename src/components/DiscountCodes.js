import RemoveDiscountCodeForm from './RemoveDiscountCodeForm';

function DiscountCodes({ cart, editable }) {
  return (
    <div>
      <div>
        <span>appliedDiscounts</span>
      </div>
      <div>
        {cart.discountCodes.map((discountInfo) => (
          <div>
            <b>{discountInfo.discountCode.code}</b>
            {discountInfo.discountCode.name ? (
              <span>
                ({discountInfo.discountCode.name})
              </span>
            ) : null}
            <span>
              {editable ? (
                <RemoveDiscountCodeForm
                  codeId={discountInfo.discountCode.codeId}
                />
              ) : null}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
export default DiscountCodes;
