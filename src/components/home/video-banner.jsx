'use client'
import { useLanguage } from '@/context/lang-context';
import React from 'react'

function VideoBanner() {
    const { language } = useLanguage();
  return (
    <div className='banner-image has-background-black is-flex is-align-items-center'>
        <video controls>
        <source src={`/video/video_banner_${language}.webm`} type="video/mp4"/>

        </video>

    </div>
  )
}

export default VideoBanner