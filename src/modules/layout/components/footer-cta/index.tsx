import UnderlineLink from "@modules/common/components/underline-link"
import Image from "next/image"
import { useEffect } from 'react';
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const squareVariants = {
  visible: { opacity: 1, transition: { duration: 1 } },
  hidden: { opacity: 0}
};


const FooterCTA = () => {
  const controls = useAnimation();
        const [ref, inView] = useInView();
        useEffect(() => {
            if (inView) {
            controls.start("visible");
            }
        }, [controls, inView]);
  return (
    <motion.div 
            ref={ref}
            animate={controls}
            initial="hidden"
            variants={squareVariants}>
    <div className="bg-amber-100 w-full conoce-mas-banner">
      <div className="content-container flex flex-col-reverse gap-y-8 small:flex-row small:items-center justify-between py-16 relative">
        <div>
          <h3 className="text-2xl-semi">Conocé un poco mas de nosotros</h3>
          <div className="mt-6">
            <UnderlineLink href="/store">Ver más</UnderlineLink>
          </div>
        </div>

        <div className="relative w-full aspect-square small:w-[35%] small:aspect-[28/36]">
          <Image
            src="/home-6/banner-1.png"
            alt=""
            layout="fill"
            objectFit="cover"
            className="absolute inset-0"
          />
        </div>
      </div>
    </div>
    </motion.div>
  )
}

export default FooterCTA
