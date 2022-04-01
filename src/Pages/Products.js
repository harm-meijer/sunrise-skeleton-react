import Pagination from '../components/Pagination';
import ProductListItem from '../components/ProductListItem';
import useProductTools from '../composition/useProductTools';

function Products() {
  const {
    formatProduct,
    products,
    total,
    loading,
    page,
    error,
    setPage,
  } = useProductTools();
  return (
    <div>
      {error ? (
        <pre>{JSON.stringify(error, undefined, 2)}</pre>
      ) : null}
      {products &&
        products.map((product) => (
          <ProductListItem
            key={product.productId}
            product={product}
          />
        ))}
      <Pagination
        total={total}
        page={page}
        setPage={setPage}
      />
    </div>
  );
}
export default Products;
