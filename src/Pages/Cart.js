import CartLikeContentDetail from '../components/CartLikeContentDetail';
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
                      <div>adddiscountcodeform</div>
                    </div>
                    <div>cartlikepricedetail</div>
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
