import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useProducts from './useProducts';

function useProductTools(expand = false) {
  const { sku } = useParams();
  const { products, total, loading, error, categoryError } =
    useProducts({
      sku,
      expand: expand ? { variants: true } : {},
    });
  const [product, setProduct] = useState(null);
  useEffect(() => setProduct(products?.[0]), [products]);
  const [allVariants, setAllVariants] = useState();
  useEffect(
    () =>
      setAllVariants(
        product
          ? [product.masterVariant]
              .concat(product.variants || [])
              .map((p) => ({
                name: product.name,
                slug: product.slug,
                ...p,
              }))
          : null
      ),
    [product]
  );
  const [currentVariant, setCurrentVariant] =
    useState(null);
  useEffect(
    () =>
      setCurrentVariant(
        allVariants
          ? allVariants.find(({ sku: c }) => sku === c)
          : null
      ),
    [allVariants, sku]
  );

  const setPage = (page) =>
    //@todo: update router param page
    page;
  const page = 1; //@todo: get page from route
  const formatProduct = (product) => ({
    ...product,
    ...product.masterVariant,
  });
  const [allError, setAllError] = useState(
    error || categoryError
  );
  useEffect(
    () => setAllError(error || categoryError),
    [categoryError, error]
  );
  return {
    total,
    products,
    loading,
    error: allError,
    allVariants,
    sku,
    currentVariant,
    setPage,
    formatProduct,
    page,
  };
}
export default useProductTools;
