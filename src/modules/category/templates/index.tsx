import usePreviews from "@lib/hooks/use-previews"
import getNumberOfSkeletons from "@lib/util/get-number-of-skeletons"
import repeat from "@lib/util/repeat"
import ProductPreview from "@modules/products/components/product-preview"
import SkeletonProductPreview from "@modules/skeletons/components/skeleton-product-preview"
import { fetchProducts } from "@pages/category/[category_id]"
import { useCart } from "medusa-react"
import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer"
import { useInfiniteQuery } from "@tanstack/react-query"

type CategoryTemplateProps = {
  category: {
    id: string
    name: string
    handle: string
  }
  products: any[] // Reemplaza "prodctdata" con el nombre correcto del array de productos
}

const CategoryTemplate: React.FC<CategoryTemplateProps> = ({ category, products }) => {
  const { cart } = useCart()
  const { ref, inView } = useInView()

  const {
    data: infiniteData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery(
    [`get_category_products`, category.id, cart?.id], // Reemplaza "get_collection_products" con "get_category_products"
    ({ pageParam }) =>
      fetchProducts(`http://localhost:9000/store/category-products/${category.id}`),
    {
      getNextPageParam: (lastPage) => lastPage.nextPage,
    }
  )

  const checkImageExists = async (url) => {
    try {
      const response = await fetch(url, { method: "HEAD" });
      return response.ok;
    } catch (error) {
      return false;
    }
  };
  

  const topBannerImage = `/top-banners/${category.handle}.png`;
  const topBannerImageMob = `/top-banners/${category.handle}-mob.png`;
  const defaultTopBannerImage = "/top-banners/top-banner-coleccion.png";
  const defaultTopBannerImageMob = "/top-banners/top-banner-coleccion-mob.png";
  
  const [hasTopBannerImage, setHasTopBannerImage] = useState(false);
  const [hasTopBannerImageMob, setHasTopBannerImageMob] = useState(false);
  
  useEffect(() => {
    const checkImages = async () => {
      const imageExists = await checkImageExists(topBannerImage);
      const imageMobExists = await checkImageExists(topBannerImageMob);
  
      setHasTopBannerImage(imageExists);
      setHasTopBannerImageMob(imageMobExists);
    };
  
    checkImages();
  }, [topBannerImage, topBannerImageMob]);



  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, hasNextPage])


  return (
    <>
    {hasTopBannerImage && (
      <>
        <img
          src={topBannerImage}
          className="collection-top-banner hidden small:block"
          alt={category.name}
        />
        <img
          src={topBannerImageMob}
          className="collection-top-banner small:hidden"
          alt={category.name}
        />
      </>
    )}
    {!hasTopBannerImage && (
      <>
        <img
          src={defaultTopBannerImage}
          className="collection-top-banner hidden small:block"
          alt={category.name}
        />
        <img
          src={defaultTopBannerImageMob}
          className="collection-top-banner small:hidden"
          alt={category.name}
        />
      </>
    )}
    
    <div className="content-container py-6">
      <div className="mb-8 text-2xl-semi">
        <h1 className="category-title">{category.name}</h1> {/* Reemplaza "collection-title" con "category-title" */}
      </div>
      <ul className="grid grid-cols-2 small:grid-cols-3 medium:grid-cols-4 gap-x-4 gap-y-8">
        {products.map((p: any) => ( // Reemplaza "prodctdata" con el nombre correcto del array de productos
          <li key={p.id}>
            <ProductPreview {...p} />
          </li>
        ))}
        {isLoading &&
          repeat(8).map((index) => (
            <li key={index}>
              <SkeletonProductPreview />
            </li>
          ))}
        {isFetchingNextPage &&
          repeat(getNumberOfSkeletons(infiniteData?.pages)).map((index) => (
            <li key={index}>
              <SkeletonProductPreview />
            </li>
          ))}
      </ul>
      <div
        className="py-16 flex justify-center items-center text-small-regular text-gray-700"
        ref={ref}
      >
        <span ref={ref}></span>
      </div>
    </div>
    </>
  )
}

export default CategoryTemplate
