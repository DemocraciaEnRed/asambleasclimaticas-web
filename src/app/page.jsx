import Banner from "@/components/home/banner";
import { BannerParticipativo } from "@/components/home/banner-participativo";
import BannerSobreProyecto from "@/components/home/banner-sobre-proyecto";

export default function Home() {
    return(
        <div className="home-wrapper">
            <Banner/>
            <BannerParticipativo/>
            <BannerSobreProyecto/>
        </div>
    )
}
