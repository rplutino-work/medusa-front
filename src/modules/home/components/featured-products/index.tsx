import { useFeaturedProductsQuery } from "@lib/hooks/use-layout-data"
import UnderlineLink from "@modules/common/components/underline-link"
import ProductPreview from "@modules/products/components/product-preview"
import SkeletonProductPreview from "@modules/skeletons/components/skeleton-product-preview"
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const squareVariants = {
    visible: { opacity: 1, transition: { duration: 1 } },
    hidden: { opacity: 0}
};

const FeaturedProducts = () => {
  const controls = useAnimation();
        const [ref, inView] = useInView();
        useEffect(() => {
            if (inView) {
            controls.start("visible");
            }
        }, [controls, inView]);

  const { data } = useFeaturedProductsQuery()

  return (
    <motion.div 
            ref={ref}
            animate={controls}
            initial="hidden"
            variants={squareVariants}>
    <div className="featured-products-block py-6">
      <div className="content-container py-12">
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-base-regular text-gray-600 mb-6">
            Más vendidos
          </span>
          <p className="text-2xl-regular text-gray-900 max-w-lg mb-4">
            A continuación te dejamos los productos más vendidos
          </p>
          <UnderlineLink href="/store">Explorar</UnderlineLink>
        </div>
        <ul className="grid grid-cols-2 small:grid-cols-4 gap-x-4 gap-y-8">
          {data
            ? data.map((product) => (
                <li key={product.id}>
                  <ProductPreview {...product} />
                </li>
              ))
            : Array.from(Array(4).keys()).map((i) => (
                <li key={i}>
                  <SkeletonProductPreview />
                </li>
              ))}
        </ul>
      </div>
    </div>
    </motion.div>
  )
}

export default FeaturedProducts
