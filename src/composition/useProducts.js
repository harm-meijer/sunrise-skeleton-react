import useLocale from './useLocale';
import useLocation from './useLocation';
import useCurrency from './useCurrency';
import useOrg from './ct/useProducts';
import usePaging from './usePaging';
import useSearch from './useSearch';
import useCustomerTools from './useCustomerTools';
import useSelectedChannel from './useSelectedChannel';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
export const useSorts = () => {
  const [sorts] = useState(() => ['lastModifiedAt desc']);
  const setSort = (sort) => sort;
  return { sorts, setSort };
};
const allCategories = (slug) =>
  slug === 'all' ? null : slug;
function useProducts({ expand } = {}) {
  const { customer } = useCustomerTools();
  const { locale } = useLocale();
  const { location } = useLocation();
  const currency = useCurrency();
  const params = useParams();
  const [categorySlug, setCategorySlug] = useState(() =>
    allCategories(params.categorySlug)
  );
  useEffect(
    () =>
      setCategorySlug(allCategories(params.categorySlug)),
    [params.categorySlug]
  );

  const [customerGroup, setCustomerGroup] = useState(
    () => customer?.customerGroupRef?.customerGroupId
  );
  useEffect(
    () =>
      setCustomerGroup(
        customer?.customerGroupRef?.customerGroupId
      ),
    [customer]
  );
  const { sku } = useParams();
  const { page = 1 } = useParams();
  const { limit, offset } = usePaging(page);
  const { sorts, setSort } = useSorts();
  const { search } = useSearch();
  const { channel } = useSelectedChannel();
  const { total, products, loading, error, categoryError } =
    useOrg({
      search,
      limit,
      offset,
      locale,
      currency,
      sorts,
      country: location,
      categorySlug,
      sku,
      channel,
      expand,
      customerGroup,
    });
  return {
    total,
    products,
    loading,
    error,
    categoryError,
    sorts,
    setSort,
  };
}
export default useProducts;
