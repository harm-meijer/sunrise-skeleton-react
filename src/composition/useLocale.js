function useLocale() {
  //@todo: locale can come from url or localstorage
  return {
    locale: "en",
    setLocale: () => {
      throw new Error("not implemented");
    },
  };
}
export default useLocale;
