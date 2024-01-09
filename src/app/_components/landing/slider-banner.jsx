'use client'
import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';




// import required modules
import { Navigation } from 'swiper/modules';

export default function App({ textsSlider }) {
  return (
    <div className='slider-wrapper'>
      <Swiper
        navigation={true}
        modules={[Navigation]}
        loop={true}
        className="mySwiper has-text-white has-background-primary">
        {textsSlider.map((text, idx) =>
          <SwiperSlide key={idx}><div className='swiper-item is-size-4 is-size-6-touch' dangerouslySetInnerHTML={{ __html: text }}></div></SwiperSlide>
        )}
      </Swiper>
    </div>
  );
}
