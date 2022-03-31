function BaseMoney({ money }) {
  const amount = money
    ? money.centAmount / 10 ** money.fractionDigits
    : 0;
  const currency = money?.currencyCode || '';
  const formattedMoney = `${currency} ${amount}`;
  return <span>{formattedMoney}</span>;
}
export default BaseMoney;
