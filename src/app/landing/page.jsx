'use client'
import BannerTitle from "@/components/common/banner-title";
import BannerPactoLanding from "@/components/landing/banner-pacto-landing";
import CountriesBanner from "@/components/landing/countries-banner";
import CountryBanner from "@/components/landing/country-banner";
import SliderBanner from "@/components/landing/slider-banner";
import { dispatch } from "@/store";
import { landingSkip } from "@/store/reducers/config";
import { redirect } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const countryList = [
    {
        name: "México",
        code: 'MX',
        image: "https://cdn-icons-png.flaticon.com/512/197/197397.png",
        city:"Monterrey (zona metropolitana)",
        date: "febrero–marzo 2024",
        topic: "Cambio Climático en la zona metropolitana. Programa Estatal de Cambio Climático",
        leader:'SUR, Instituto del Sur Urbano',
        description:'La Asamblea Climática de Nuevo León está integrada por 50 personas ciudadanas seleccionadas al azar, por medio de un mecanismo de sorteo cívico, que se reúnen para deliberar mejoras a las políticas ambientales urbanas para la Zona Metropolitana de Monterrey, en forma de desafío público.'
    },
    {
        name: "Brasil",
        code: 'BR',
        image: "https://cdn-icons-png.flaticon.com/512/197/197386.png",
        city:"Por definir",
        date: "marzo-mayo 2024",
        topic: "Por definir",
        leader:'IDEEMOS',
        description:''
    },
    {
        name: "Colombia",
        code: 'CO',
        image: "https://cdn-icons-png.flaticon.com/512/197/197575.png",
        city:"Buenaventura",
        date: "mayo-julio 2024",
        topic: "Por definir",
        leader:'Extituto',
        description:''
    },
    {
        name: "Argentina",
        code: 'AR',
        image: "https://cdn-icons-png.flaticon.com/512/197/197573.png",
        city:"Por definir",
        date: "febrero–marzo 2024",
        topic: "Por definir",
        leader:'Democracia en Red',
        description:''
    },
]

export default function Home() {
    const [countries, setCountries] = useState(countryList)
    const config = useSelector((state)=>state.config)

    const handleClick = () => {
        dispatch(landingSkip())
        window.location.href= "/"
    }

  
  useEffect(()=>{
    if (config.landingSkip) return redirect('/')
  },[])

    return(
        <div className="landing-wrapper">
            <BannerTitle image="/images/image-city.png" title="" subtitle="ASAMBLEAS CLIMÁTICAS" actionClick={handleClick} textButton="Comenzar"/>
            <CountriesBanner countries={countries}/>
            <SliderBanner />
            <BannerPactoLanding />
            {countries.map(country => <CountryBanner key={country.code} country={country} />)}
        </div>
    )
}
