import React from "react";
import Experience from "@pages/home/experience/Experience";
import useScrollSnap from "react-use-scroll-snap";
import { MarkerContextProvider } from "@marker/MarkerContext";
import BackgroundSection from "@/components/BackgroundSection";
import { Section1, Section2, Section3 } from "@pages/home/sections";
import { KeyboardContextProvider } from "@keyboard/KeyboardContext";

const Home = () => {
    const mainRef = React.useRef<HTMLDivElement>(null);

    useScrollSnap({ ref: mainRef, duration: 200 });

    return (
        <KeyboardContextProvider>
            <MarkerContextProvider>
                <Experience />

                <Section1 />
                <Section2 />
                <Section3 />

                <main className="home" ref={mainRef}>
                    <BackgroundSection />
                    <BackgroundSection />
                    <BackgroundSection />
                </main>
            </MarkerContextProvider>
        </KeyboardContextProvider>
    );
};

export default Home;
