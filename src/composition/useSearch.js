import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

const useSearch = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams?.q;
  const setSearch = useCallback(
    (search) =>
      setSearchParams((params) => ({
        ...params,
        q: search,
      })),
    [setSearchParams]
  );

  return {
    search,
    setSearch,
  };
};
export default useSearch;
