import useCategories from "../composition/useCategories";

function Menu() {
  const { categories } = useCategories({
    rootOnly: true,
    sort: ["orderHint asc"],
  });
  const isActive = (slug) =>
    //@todo: depends on category slug
    false;
  return "hi";
}

export default Menu;
