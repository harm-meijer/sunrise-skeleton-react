import { Link } from 'react-router-dom';
import AddDiscountCodeForm from '../components/AddDiscountCodeForm';
import CartLikeContentDetail from '../components/CartLikeContentDetail';
import CartLikePriceDetail from '../components/CartLikePriceDetail';
import useCart from '../composition/useCart';
import useCartTools from '../composition/useCartTools';

function Cart() {
  const { cart, loading, error } = useCart();
  const { cartNotEmpty } = useCartTools();
  return loading ? (
    'loading'
  ) : error ? (
    <pre>{JSON.stringify(error, undefined, 2)}</pre>
  ) : (
    <div>
      {cartNotEmpty(cart) ? (
        <div>
          <div>
            <div>
              <div>
                <form>
                  <div>
                    <div>
                      <CartLikeContentDetail
                        cart={cart}
                        editable={true}
                      />
                      <div>
                        <AddDiscountCodeForm />
                      </div>
                    </div>
                    <div>
                      <CartLikePriceDetail
                        cart={cart}
                        editable={true}
                      />
                    </div>
                    <div>
                      <Link to="/checkout">checkout</Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {!cartNotEmpty(cart) ? (
        <div>
          <div>
            <div>
              <h2>Your Cart</h2>
              <p>empty</p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
export default Cart;
