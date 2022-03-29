import useLocale from "./useLocale";
import useMyOrderBasic from "./ct/useMyOrder";

function useMyOrder() {
  const { locale } = useLocale();
  //@todo: get id from route and set it if changed
  const id = "88";
  const { loading, error, order } = useMyOrderBasic({
    locale,
    id,
  });

  return { loading, error, order };
}
export default useMyOrder;