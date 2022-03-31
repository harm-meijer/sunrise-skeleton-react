import useLocale from './useLocale';
import useOrg from './ct/useCart';
//Vue/app specific code
function useCart() {
  const { locale } = useLocale();
  return useOrg({
    locale,
  });
}
export default useCart;
