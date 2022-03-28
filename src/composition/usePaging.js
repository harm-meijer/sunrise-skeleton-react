import { useEffect, useState } from "react";
import { DEFAULT_PAGE_SIZE } from "../constants";
import { getValue } from "../lib";

//this should work in react
const usePage = (
  page = 1,
  pageSize = DEFAULT_PAGE_SIZE
) => {
  const limit = Number(pageSize);
  return { limit, offset: (page - 1) * limit };
};
//vue specific implementation
function usePaging(page, pageSize = DEFAULT_PAGE_SIZE) {
  const { limit: l, offset: o } = usePage(page, pageSize);

  const [limit, setLimit] = useState(l);
  const [offset, setOffset] = useState(o);
  useEffect(() => {
    setLimit(l);
    setOffset(o);
  }, [l, o]);
  return { limit, offset };
}
export default usePaging;
