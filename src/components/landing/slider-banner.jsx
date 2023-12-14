import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';




// import required modules
import { Navigation } from 'swiper/modules';

export default function App() {
  return (
    <div className='slider-wrapper'>
      <Swiper 
        navigation={true} 
        modules={[Navigation]} 
        loop={true}
        className="mySwiper has-text-white has-background-primary">
        <SwiperSlide><div className='swiper-item is-size-4'><strong className='has-text-white'>(Re)surgentes</strong> es una red de Asambleas Climáticas, acompañadas por expertas, gobiernos locales, y organizaciones especializadas en democracia deliberativa en América Latina.</div></SwiperSlide>
        <SwiperSlide><div className='swiper-item is-size-4'><strong className='has-text-white'>Nuestro objetivo</strong> es fortalecer los procesos de democratización y descentralización de toma de decisiones públicas frente a la crisis climática en América Latina.</div></SwiperSlide>
        <SwiperSlide><div className='swiper-item is-size-4'><strong className='has-text-white'>Las Asambleas Climáticas</strong> – son mecanismos de democracia deliberativa que buscan asegurar que personas ciudadanas seleccionadas al azar tomemos un rol central en la toma de decisiones sobre el clima en América Latina.</div></SwiperSlide>
      </Swiper>
    </div>
  );
}
