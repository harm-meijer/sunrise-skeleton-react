import useLocale from "./useLocale";
import useOrg from "./ct/useCategories";
//vue specific useCategories
function useCategories({
  categorySlug,
  skip = false,
  rootOnly = false,
  sort = [],
}) {
  const { locale } = useLocale();
  const { total, categories, loading, error } = useOrg({
    locale,
    categorySlug,
    rootOnly,
    sort,
    skip,
  });
  return { total, categories, loading, error };
}
export default useCategories;
