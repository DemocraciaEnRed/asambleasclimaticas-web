'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { ComoParticiparInfo } from './como-participar'
import { AcercaDeInfo } from './acercade'

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
    'name': 'Preguntas frecuentes',
    'value': 'faq'
  },
  {
    'name': 'Sobre el sitio',
    'value': 'sobre-el-sitio'
  },
  {
    'name': 'Contacto',
    'value': 'contacto'
  }
]

const content = {
  'acerca-de': <AcercaDeInfo/>,
  'como-participar': <ComoParticiparInfo/>,
  'faq': <div>preguntas frecuentes</div>,
  'sobre-el-sitio': <div> sobre el sitio</div>,
  'contacto': <div>contacto</div>
}

export default function StaticInfo() {
  const [section, setSection] = useState('acerca-de')

  const changeSection = (section) => {
    setSection(section)
  }
  return (
    <>
      <div className='banner-wrapper'></div>
      <div className='static-info-wrapper'>
        <div className='static-info-nav'>
          {buttons.map((button, i) => (
            <button
              className='button-section'
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
