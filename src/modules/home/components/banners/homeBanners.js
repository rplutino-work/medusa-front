import React, { useEffect } from "react";
import Link from "next/link"
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const squareVariants = {
    visible: { opacity: 1, transition: { duration: 1} },
    hidden: { opacity: 0}
};

const HomeBanners = () => {
        
        const controls = useAnimation();
        const [ref, inView] = useInView();
        useEffect(() => {
            if (inView) {
            controls.start("visible");
            }
        }, [controls, inView]);

        
    return (
        <motion.div className="home-slider-3"
            ref={ref}
            animate={controls}
            initial="hidden"
            variants={squareVariants}>
        
            <div className='home-slider-3-banner-1'>
                <Link href=''><img src='/home-3/banner-izq.png'></img></Link>
            </div>
            <div className='home-slider-3-banner-2'>
                <Link href=''><img src='/home-3/banner-centro.png'></img></Link>
            </div>
            <div className='home-slider-3-banner-3'>
                <Link href=''><img src='/home-3/banner-der.png'></img></Link>
            </div>
        </motion.div>
    );
};

export default HomeBanners;