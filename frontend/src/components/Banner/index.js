import React from 'react';
import './style.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";	
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'
import img1 from './img/1.jpg';
import img2 from './img/2.jpg';
import img3 from './img/3.jpg';
import img4 from './img/4.jpg';

SwiperCore.use([Navigation, Pagination, Autoplay])

function Banner()  {
    return(
        <div>
            <Swiper
            className="banner"
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 2500 }}
            >
            <SwiperSlide><img src={img1} alt="img1" className='banner_img'></img></SwiperSlide>
            <SwiperSlide><img src={img2} alt="img2" className='banner_img'></img></SwiperSlide>
            <SwiperSlide><img src={img3} alt="img3" className='banner_img'></img></SwiperSlide>
            <SwiperSlide><img src={img4} alt="img4" className='banner_img'></img></SwiperSlide>
            </Swiper>
      </div>
        );
}


export default Banner;