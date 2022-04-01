import useLocale from './useLocale';
import useMyOrderBasic from './ct/useMyOrder';
import { useParams } from 'react-router-dom';

function useMyOrder() {
  const { locale } = useLocale();
  const { id } = useParams();
  const { loading, error, order } = useMyOrderBasic({
    locale,
    id,
  });

  return { loading, error, order };
}
export default useMyOrder;
