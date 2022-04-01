function useLocation() {
  //@todo: location from url or local storgage?
  return {
    location: 'US',
    setLocation: () => {
      throw new Error('setLocation not implemented');
    },
  };
}
export default useLocation;
