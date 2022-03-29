function useLocation() {
  //@todo: location from url
  return {
    location: "US",
    setLocation: () => {
      throw new Error("setLocation not implemented");
    },
  };
}
export default useLocation;
