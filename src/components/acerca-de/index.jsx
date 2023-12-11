'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { ComoParticiparInfo } from './como-participar'
import { AcercaDeInfo } from './acercade'
import { ContantInfo } from './contacto'

const buttons = [
  {
    'name': 'Acerca de',
    'value': 'acerca-de'
  },
  {
    'name': 'Cómo participar',
    'value': 'como-participar'
  },
  {
    'name': 'Contacto',
    'value': 'contacto'
  }
]

const content = {
  'acerca-de': <AcercaDeInfo/>,
  'como-participar': <ComoParticiparInfo/>,
  'contacto': <ContantInfo/>
}

export default function StaticInfo() {
  const [section, setSection] = useState('acerca-de')

  const changeSection = (section) => {
    setSection(section)
  }
  return (
    <>
      <div className='banner-wrapper has-background-primary'></div>
      <div className='static-info-wrapper'>
        <div className='static-info-nav'>
          {buttons.map((button, i) => (
            <button
              className={`button-section ${section === button.value ? 'active' : ''}`}
              onClick={() => changeSection(button.value)}
              key={i}>
              {button.name}
            </button>
          ))}
        </div>
        {content[section]}
      </div>
    </>
  )
}
