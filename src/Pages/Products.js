import { useParams } from "react-router-dom";
import useProductTools from "../composition/useProductTools";

function Products() {
  // const { addLine } = useCartTools();
  const {
    formatProduct,
    products,
    total,
    loading,
    page,
    error,
    setPage,
  } = useProductTools();

  console.log({
    formatProduct,
    products,
    total,
    loading,
    page,
    error,
    setPage,
  });
  return "this is products";
}
export default Products;
