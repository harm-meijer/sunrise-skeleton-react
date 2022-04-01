function BaseAddress({ address }) {
  return (
    <div>
      <div>
        {address.title} {address.firstName}{' '}
        {address.lastName}
      </div>
      <div>
        {address.streetName} {address.streetNumber}
      </div>
      <div>{address.additionalStreetInfo}</div>
      <div>
        {address.postalCode}, {address.city} (
        {address.country})
      </div>
      <br />
      <div>{address.phone}</div>
      <div>{address.email}</div>
    </div>
  );
}
export default BaseAddress;
