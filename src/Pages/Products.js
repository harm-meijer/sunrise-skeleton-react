import ProductListItem from "../components/ProductListItem";
import useProductTools from "../composition/useProductTools";

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
      {products &&
        products.map((product) => (
          <ProductListItem
            key={product.productId}
            product={product}
          />
        ))}
      {/* @todo: use other returned values from useProductTools */}
      {/* @todo: need pagination */}
    </div>
  );
}
export default Products;
