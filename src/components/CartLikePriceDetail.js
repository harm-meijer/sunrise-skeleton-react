import useCartTools from '../composition/useCartTools';
import BasePrice from './BasePrice';
import DiscountCodes from './DiscountCodes';

function CartLikePriceDetail({ cart, editable = false }) {
  const { subTotal, taxes, discountCodesExist } =
    useCartTools();
  return cart ? (
    <div>
      <h4>cartTotals</h4>
      <div>
        <div>
          <div>
            <span>subtotal</span>
          </div>
          <div>
            <span>
              <BasePrice price={subTotal(cart)} />
            </span>
          </div>
        </div>

        <div>
          <div>
            <span>salesTax</span>
          </div>
          <div>
            <span>
              <BasePrice price={taxes(cart)} />
            </span>
          </div>
        </div>
        {discountCodesExist(cart) ? (
          <DiscountCodes cart={cart} editable={editable} />
        ) : null}
      </div>
      <div>
        <div>
          <b>total</b>
        </div>
        <div>
          <b>
            <BasePrice price={{ value: cart.totalPrice }} />
          </b>
        </div>
      </div>
      <div>
        {/* <router-link
      :to="{ name: 'checkout' }"
      data-test="checkout-button"
      >{{ t('checkout') }}</router-link
    > */}
      </div>
    </div>
  ) : null;
}
export default CartLikePriceDetail;
