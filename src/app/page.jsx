import Banner from "@/components/home/banner";
import BannerPacto from "@/components/home/banner-pacto";
import { BannerParticipativo } from "@/components/home/banner-participativo";
import BannerResurgente from "@/components/home/banner-resurgente";
import BannerSobreProyecto from "@/components/home/banner-sobre-proyecto";
import BannerTitle from "@/components/home/banner-title";

export default function Home() {
    
    return(
        <div className="home-wrapper">
            <BannerTitle/>
            <Banner/>
            <BannerResurgente/>
            <BannerParticipativo/>
            <BannerPacto/>
            <BannerSobreProyecto/>
        </div>
    )
}
