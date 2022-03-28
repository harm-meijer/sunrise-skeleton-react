import { useState } from "react";
import useMyOrdersBasic from "./ct/useMyOrders";
import usePaging from "./usePaging";

function useMyOrders() {
  //@todo: get initial page from route
  const [p, setP] = useState("1");
  const { limit, offset } = usePaging(p);
  const setPage = (page) =>
    //@todo: set router page prop
    88;
  const { error, loading, orders, total } =
    useMyOrdersBasic({ limit, offset });
  return {
    page: p,
    error,
    loading,
    orders,
    total,
    setPage,
  };
}
export default useMyOrders;
