import { Link } from "react-router-dom";
import useCategories from "../composition/useCategories";

function Menu() {
  const { categories } = useCategories({
    rootOnly: true,
    sort: ["orderHint asc"],
  });
  const isActive = (slug) =>
    //@todo: depends on category slug
    false;
  return categories
    ? categories.map((category) => (
        <span key={category.id}>
          <Link to={`products/${category.slug}`}>
            {category.name.toUpperCase()}
          </Link>
        </span>
      ))
    : null;
}

export default Menu;
