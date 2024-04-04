import BannerTitle from "@/app/_components/common/banner-title";
import BannerPactoLanding from "@/app/_components/landing/banner-pacto-landing";
import CountriesBanner from "@/app/_components/landing/countries-banner";
import CountryBanner from "@/app/_components/landing/country-banner";
import SliderBanner from "@/app/_components/landing/slider-banner";
import { getDictionary } from "./dictionaries";

export async function generateStaticParams() {
    return ['es', 'pt'].map((lang) => {
        return { lang }
    })
}


export default async function Landing({ params: { lang } }) {
    const dict = await getDictionary(lang)



    return (
        <div className="landing-wrapper">
            <BannerTitle
                title={dict.bannerTitle.title}
                linkButton="#banner-interciudad"
                textButton={dict.bannerTitle.button}
                subtitle={dict.bannerTitle.subtitle}
            />
            <CountriesBanner
                dict={dict}
                countries={dict.countriesBanner.countries}
                title={dict.countriesBanner.title}
            />
            <SliderBanner
                textsSlider={dict.sliderBanner}
            />
            <BannerPactoLanding
                title={dict.pactoBannerSecction.title}
                description={dict.pactoBannerSecction.description} />
            <div className="country-banner">
                {dict.countriesBanner.countries.map(country => <CountryBanner key={country.code} dict={dict} country={country} />)}
            </div>
        </div>
    )
}
