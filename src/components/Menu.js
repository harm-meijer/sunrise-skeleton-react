import { Link, useParams } from 'react-router-dom';
import useCategories from '../composition/useCategories';

function Menu() {
  const { categorySlug } = useParams();
  const { categories } = useCategories({
    rootOnly: true,
    sort: ['orderHint asc'],
  });
  const isActive = (slug) => slug === categorySlug;
  return categories
    ? categories.map((category) => (
        <span
          key={category.id}
          style={
            isActive(category.slug)
              ? { backgroundColor: 'gray' }
              : null
          }
        >
          <Link to={`products/${category.slug}`}>
            {category.name.toUpperCase()}
          </Link>
        </span>
      ))
    : null;
}

export default Menu;
