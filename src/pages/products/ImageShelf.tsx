import { medusaClient } from "@lib/config"
import { IS_BROWSER } from "@lib/constants"
import { getProductHandles } from "@lib/util/get-product-handles"
import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import ProductTemplate from "@modules/products/templates"
import SkeletonProductPage from "@modules/skeletons/templates/skeleton-product-page"
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { ParsedUrlQuery } from "querystring"
import { ReactElement } from "react"
import { NextPageWithLayout, PrefetchedPageProps } from "types/global"
import ImageGallery from "../../modules/products/components/image-gallary"
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import Image from "next/image"

interface Params extends ParsedUrlQuery {
  handle: string
}
type DetailProps = {
  handle2: any
}

const fetchProduct = async (handle: string) => {
  return await medusaClient.products
    .list({ handle })
    .then(({ products }) => products[0])
}

const ShelfProductImage:React.FC<DetailProps> = ({ handle2}) => {
  
  const { query, isFallback, replace } = useRouter()
  console.log(handle2)
  const handle = typeof handle2 === "string" ? handle2 : ""

  const { data, isError, isLoading, isSuccess } = useQuery(
    [`get_product`, handle],
    () => fetchProduct(handle),
    {
      enabled: handle.length > 0,
      keepPreviousData: true,
    }
  )

  // if (notFound) {
  //   if (IS_BROWSER) {
  //     replace("/404")
  //   }

  //   return <SkeletonProductPage />
  // }

  // if (isFallback || isLoading || !data) {
  //   return <SkeletonProductPage />
  // }

  if (isError) {
    replace("/404")
  }

  if (isSuccess) {

    return (
      <div className="relative">
      <div className="shelf-cucardas-container">
        {data?.collection?.id == "pcol_01GYBQYA0Y3CH181SWT7CYZ622"?
          <div className="shelf-cucardas-box">
          <img src="/cucardas/cucarda-coleccion-1.png" alt={data.collection.title} />
          </div>
          :
          <></>
        }
        {data?.collection?.id == "pcol_01GYCS86X8331SNRR96VC1AAV9"?
          <div className="shelf-cucardas-box">
          <img src="/cucardas/cucarda-coleccion-2.png" alt={data.collection.title} />
          </div>
          :
          <></>
        }
      </div>
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper-2"
      >
      {data?.images?.map((image) => {
          return (
            <SwiperSlide key={image.url}>
              <img src={image.url} alt="" />
              
            </SwiperSlide>
          )
        })}
        </Swiper>
        
      </div>
    )
  }

  return <></>
}


// export const getStaticPaths: GetStaticPaths<Params> = async () => {
//   const handles = await getProductHandles()
//   return {
//     paths: handles.map((handle) => ({ params: { handle } })),
//     fallback: true,
//   }

// }
// export const getStaticProps: GetStaticProps = async (context) => {
//   const handle = context.params?.handle as string
//   const queryClient = new QueryClient()

//   await queryClient.prefetchQuery([`get_product`, handle], () =>
//     fetchProduct(handle)
//   )

//   const queryData = await queryClient.getQueryData([`get_product`, handle])

//   if (!queryData) {
//     return {
//       props: {
//         notFound: true,
//       },
//     }
//   }

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//       notFound: false,
//     },
//   }
// }

export default ShelfProductImage
