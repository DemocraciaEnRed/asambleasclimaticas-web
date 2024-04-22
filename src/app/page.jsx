import { Suspense } from "react";

import Banner from "@/components/home/banner";
import BannerPacto from "@/components/home/banner-pacto";
import { BannerParticipativo } from "@/components/home/banner-participativo";
import BannerResurgente from "@/components/home/banner-resurgente";
import BannerSobreProyecto from "@/components/home/banner-sobre-proyecto";
import BannerTitle from "@/components/common/banner-title";
import Skeleton from "@/components/common/skeleton";
import BannerProjectCards from "@/components/home/banner-project-cards";


export default async function Home() {

    return (
        <div className="home-wrapper">
            <BannerTitle
                title="Pacto Inter-ciudad"
                subtitle="*PACTO INTERCIDADE"
                urlButton="#banner-participativo"
                textButton="Participar"
            />
            <BannerParticipativo />
            <Banner />
            <BannerResurgente />
            <Suspense fallback={<Skeleton height={500} />}>
                <BannerProjectCards />
            </Suspense>
            <BannerSobreProyecto />
        </div>
    );
}
