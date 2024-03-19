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
        setInterval(() => {
            var randomNumber = Math.random();
            const index = Math.floor(BANNER_BACKGROUND.length * randomNumber);
            setImageActive(index);
        }, 5000);
    };
    useEffect(() => {
        getRandomBackground();
    }, []);
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
