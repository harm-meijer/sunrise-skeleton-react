import BaseMoney from './BaseMoney';

function BasePrice({ price }) {
  const hasDiscount = price?.discounted;

  const discountedPrice = price?.discounted?.value;
  const originalPrice = price?.value;

  return (
    <span>
      {!hasDiscount ? (
        <span>
          <BaseMoney money={originalPrice} />
        </span>
      ) : null}
      {hasDiscount ? (
        <span>
          <span style={{ textDecoration: 'line-through' }}>
            <BaseMoney money={originalPrice} />
          </span>
          <span>
            <BaseMoney money={discountedPrice} />
          </span>
        </span>
      ) : null}
    </span>
  );
}
export default BasePrice;
