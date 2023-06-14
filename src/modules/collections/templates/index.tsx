import usePreviews from "@lib/hooks/use-previews"
import getNumberOfSkeletons from "@lib/util/get-number-of-skeletons"
import repeat from "@lib/util/repeat"
import ProductPreview from "@modules/products/components/product-preview"
import SkeletonProductPreview from "@modules/skeletons/components/skeleton-product-preview"
import { fetchCollectionProducts } from "@pages/collections/[id]"
import { useCart } from "medusa-react"
import React, { useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { useInfiniteQuery } from "@tanstack/react-query"
import clsx from "clsx"
import Image from "next/image"

type CollectionTemplateProps = {
  collection: {
    id: string
    title: string
  }
}

const CollectionTemplate: React.FC<CollectionTemplateProps> = ({
  collection,
}) => {
  const { cart } = useCart()
  const { ref, inView } = useInView()

  const {
    data: infiniteData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery(
    [`get_collection_products`, collection.id, cart?.id],
    ({ pageParam }) =>
      fetchCollectionProducts({
        pageParam,
        id: collection.id,
        cartId: cart?.id,
      }),
    {
      getNextPageParam: (lastPage) => lastPage.nextPage,
    }
  )

  const previews = usePreviews({
    pages: infiniteData?.pages,
    region: cart?.region,
  })


  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, hasNextPage])

  let top_banner_image =  `/top-banners/${collection.title}.png`
  let top_banner_image_mob =  `/top-banners/${collection.title}-mob.png`

  return (
    <>
    {top_banner_image?
    <>
    <img src={top_banner_image} className="collection-top-banner hidden small:block" alt={collection.title} />
    <img src={top_banner_image_mob} className="collection-top-banner small:hidden" alt={collection.title} />
    </>
    :
    <>
    <img src="/top-banners/top-banner-coleccion.png" className="collection-top-banner hidden small:block" alt={collection.title} />
    <img src="/top-banners/top-banner-coleccion-mob.png" className="collection-top-banner small:hidden" alt={collection.title} />
    </>
    }
    <div className="content-container py-6">
      <div className="mb-8 text-2xl-semi">
        <h1 className="collection-title">{collection.title}</h1>
      </div>
      <ul className="grid grid-cols-2 small:grid-cols-3 medium:grid-cols-4 gap-x-4 gap-y-8">
        {previews.map((p) => (
          <li key={p.id}>
            <ProductPreview {...p} />
          </li>
        ))}
        {isLoading &&
          !previews.length &&
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

export default CollectionTemplate
