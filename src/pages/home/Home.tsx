import React from "react";
import Experience from "@pages/home/experience/Experience";
import useScrollSnap from "react-use-scroll-snap";
import { Variants } from "framer-motion";
import { MarkerContextProvider } from "@experience/MarkerContext";
import { Section1, Section2, Section3 } from "@pages/home/sections";

export const viewAnimation: Variants = {
    hidden: {
        opacity: 0,
        x: -30,
        transition: {
            duration: 0.5,
            delay: 0.3,
        },
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.5,
            delay: 0.3,
        },
    },
};

const Home = () => {
    const mainRef = React.useRef<HTMLDivElement>(null);

    useScrollSnap({ ref: mainRef, duration: 200 });

    return (
        <MarkerContextProvider>
            <Experience />

            <main className="home" ref={mainRef}>
                <Section1 />
                <Section2 />
                <Section3 />
            </main>
        </MarkerContextProvider>
    );
};

export default Home;
