import useLocale from './useLocale';
import useLocation from './useLocation';
import useCurrency from './useCurrency';
import useOrg from './ct/useShippingMethods';

function useShippingMethods() {
  const { locale } = useLocale();
  const { location } = useLocation();
  const currency = useCurrency();
  const { total, shippingMethods, loading, error } = useOrg(
    {
      locale,
      currency,
      country: location,
    }
  );
  return {
    total,
    shippingMethods,
    loading,
    error,
  };
}
export default useShippingMethods;
