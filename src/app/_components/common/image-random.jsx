"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

import Logo from "./logo";
import { BANNER_BACKGROUND } from "@/utils/constants";
import Image from "next/image";

const ImageRandom = ({
    urlAction,
    title,
    subtitle,
    linkButton,
    textButton,
}) => {
    const [imageActive, setImageActive] = useState(0);

    const getRandomBackground = () => {
        setTimeout(() => {
            let index =
                imageActive < BANNER_BACKGROUND.length - 1
                    ? imageActive + 1
                    : 0;
            setImageActive(index);
        }, 5000);
    };
    useEffect(() => {
        getRandomBackground();
    }, [imageActive]);
    return (
        <div>
            {BANNER_BACKGROUND.map((image, idx) => (
                <Image
                    key={idx}
                    src={`/images/banners/${image}`}
                    alt="imagen país"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className={`banner-background ${
                        idx === imageActive ? "active" : ""
                    }`}
                />
            ))}
        </div>
    );
};

export default ImageRandom;
