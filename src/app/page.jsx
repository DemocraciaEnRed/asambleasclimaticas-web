import Banner from "@/components/home/banner";
import BannerPacto from "@/components/home/banner-pacto";
import { BannerParticipativo } from "@/components/home/banner-participativo";
import BannerResurgente from "@/components/home/banner-resurgente";
import BannerSobreProyecto from "@/components/home/banner-sobre-proyecto";
import BannerTitle from "@/components/common/banner-title";
import { Suspense } from "react";
import Skeleton from "@/components/common/skeleton";

export default async function Home() {

    return (
        <div className="home-wrapper">
            <BannerTitle image="/images/image-city.png" title="Pacto Inter-ciudad" subtitle="*PACTO INTERCIDADE" urlButton='#banner-participativo' textButton="Participar" />
            <BannerParticipativo />
            <Banner />
            <BannerResurgente />
            <Suspense fallback={<Skeleton height={500}/>}>
                <BannerPacto />
            </Suspense>
            <BannerSobreProyecto />
        </div>
    )
}
