'use client'
import { useLanguage } from '@/context/lang-context';
import React from 'react'

function VideoBanner() {
    let { language } = useLanguage();
    // if language is pt, set language to pt, else set language to es
    language = language === 'pt' ? 'pt' : 'es';
  return (
    <div className='banner-image has-background-black is-flex is-align-items-center'>
        <video muted controls poster={`https://democraciaenred.nyc3.digitaloceanspaces.com/projects/asambleasclimaticas/video_banner_${language}.png`} loop>
        <source src={`https://democraciaenred.nyc3.digitaloceanspaces.com/projects/asambleasclimaticas/video_banner_${language}.webm`} type="video/webm"/>

        </video>

    </div>
  )
}

export default VideoBanner