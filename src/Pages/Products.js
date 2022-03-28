import { useParams } from "react-router-dom";

function Products() {
  const { categorySlug = "all", page = "1" } = useParams();
  console.log(categorySlug, page);
  return "this is products";
}
export default Products;
