import useTranslation from 'next-translate/useTranslation';
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link"

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";


import UnderlineLink from "@modules/common/components/underline-link"

import Image from "next/image"

export default function HomeSlider() {
    const { t } = useTranslation('common');
    return (
      <>
        <Swiper
          spaceBetween={0}
          centeredSlides={true}
          autoplay={{
            delay: 7500,
            disableOnInteraction: true,
          }}
          loop={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <Link href="/colecciones">
              <Image
              src="/slider-home/slider-home-1.png"
              layout="fill"
              loading="eager"
              priority={true}
              quality={90}
              objectFit="cover"
              alt="Photo by @thevoncomplex https://unsplash.com/@thevoncomplex"
              className="absolute inset-0"
              draggable="false"
              />
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <div className="text-white absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:text-left small:justify-end small:items-start small:p-32">
            {/* <h1 className="text-2xl-semi mb-4 drop-shadow-md shadow-black">
            Summer styles are finally here
            </h1>
            <p className="text-base-regular max-w-[32rem] mb-6 drop-shadow-md shadow-black">
            This year, our new summer collection will shelter you from the harsh
            elements of a world that doesn&apos;t care if you live or die.
            </p>
            <UnderlineLink href="/store">Explore products</UnderlineLink> */}
            </div>
            <Image
            src="/slider-home/slider-home-2.png"
            layout="fill"
            loading="eager"
            priority={true}
            quality={90}
            objectFit="cover"
            alt="Photo by @thevoncomplex https://unsplash.com/@thevoncomplex"
            className="absolute inset-0"
            draggable="false"
            />
          </SwiperSlide>
          <SwiperSlide>
            <div className="text-white absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:text-left small:justify-end small:items-start small:p-32">
            {/* <h1 className="text-2xl-semi mb-4 drop-shadow-md shadow-black">
            Summer styles are finally here
            </h1>
            <p className="text-base-regular max-w-[32rem] mb-6 drop-shadow-md shadow-black">
            This year, our new summer collection will shelter you from the harsh
            elements of a world that doesn&apos;t care if you live or die.
            </p>
            <UnderlineLink href="/store">Explore products</UnderlineLink> */}
            </div>
            <Image
            src="/slider-home/slider-home-3.png"
            layout="fill"
            loading="eager"
            priority={true}
            quality={90}
            objectFit="cover"
            alt="Photo by @thevoncomplex https://unsplash.com/@thevoncomplex"
            className="absolute inset-0"
            draggable="false"
            />
          </SwiperSlide>
        </Swiper>
      </>
    );
  }