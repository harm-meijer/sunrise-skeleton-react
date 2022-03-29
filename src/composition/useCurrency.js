import useLocation from "./useLocation";
import config from "../sunrise.config";
import { getValue } from "../lib";
import { useEffect, useState } from "react";
const currencyFromConfig = (location) =>
  config.formats.number[location]?.currency?.currency;
function useCurrency() {
  const { location } = useLocation();
  const [currency, setCurrency] = useState(
    currencyFromConfig(getValue(location))
  );
  useEffect(
    () =>
      setCurrency(currencyFromConfig(getValue(location))),
    [location]
  );
  return currency;
}
export default useCurrency;
