import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const squareVariants = {
  visible: { opacity: 1, transition: { duration: 1 } },
  hidden: { opacity: 0 },
};

export default function BrandsSwipper() {
  const controls = useAnimation();
  const [ref, inView] = useInView();
  
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <>
      <motion.div
        ref={ref}
        animate={controls}
        initial="hidden"
        variants={squareVariants}
      >
        <Swiper
          slidesPerView={2}
          spaceBetween={20}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          breakpoints={{
            1024: {
              slidesPerView: 6,
              spaceBetween: 10,
            },
          }}
          className="mySwiper-2"
        >
          <SwiperSlide>
            <img src="https://cdn.freebiesupply.com/logos/large/2x/abu-garcia-logo-png-transparent.png" alt="Logo 1" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://cdn.freebiesupply.com/logos/large/2x/shimano-logo-png-transparent.png" alt="Logo 2" />
          </SwiperSlide>
          {/* Add more SwiperSlides with images */}
        </Swiper>
      </motion.div>
    </>
  );
}
