import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useMyOrdersBasic from './ct/useMyOrders';
import usePaging from './usePaging';

function useMyOrders() {
  const { page } = useParams();
  const { limit, offset } = usePaging(Number(page));
  const navigate = useNavigate();
  const setPage = (page) =>
    navigate(`/user/orders/${page}`);
  const { error, loading, orders, total } =
    useMyOrdersBasic({ limit, offset });
  return {
    page: Number(page),
    error,
    loading,
    orders,
    total,
    setPage,
  };
}
export default useMyOrders;
