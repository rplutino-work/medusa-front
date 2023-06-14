import React, { useEffect } from 'react';
import Link from "next/link"
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const squareVariants = {
    visible: { opacity: 1, transition: { duration: 1 } },
    hidden: { opacity: 0}
};

const GridBanners = () => {
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
        <div className='grid-banners-home'>
            <div className='grid-banners-home-50-1'>
                <div>
                    <Link href=''><img src='/home-5/banner-izq.png'></img></Link>
                </div>
            </div>
            <div className='grid-banners-home-50-2'>
                <div>
                    <Link href=''><img src='/home-5/banner-der-1.png'></img></Link>
                </div>
                <div>
                    <Link href=''><img src='/home-5/banner-der-2.png'></img></Link>
                </div>
                <div>
                    <Link href=''><img src='/home-5/banner-der-3.png'></img></Link> 
                </div>
                <div>
                    <Link href=''><img src='/home-5/banner-der-4.png'></img></Link>
                </div>
            </div>
        </div>
        </motion.div>
    );
};

export default GridBanners;