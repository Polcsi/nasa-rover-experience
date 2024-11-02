import React from "react";
import Section from "@/components/Section";
import Experience from "@pages/home/experience/Experience";
import useScrollSnap from "react-use-scroll-snap";

const Home = () => {
    const mainRef = React.useRef<HTMLDivElement>(null);

    useScrollSnap({ ref: mainRef, duration: 200 });

    return (
        <React.Fragment>
            <Experience />

            <main className="home" ref={mainRef}>
                <Section>
                    <div className="w-2/4 flex flex-col gap-7">
                        <h1 className="poppins-bold text-5xl md:text-7xl leading-tight md:leading-[80px]">
                            Mars Science Laboratory: Curiosity Rover
                        </h1>
                        <p className="text-sm md:text-base">
                            Part of NASA's Mars Science Laboratory mission, at the time of launch, Curiosity was the
                            largest and most capable rover ever sent to Mars at that time.
                        </p>
                    </div>
                </Section>
                <Section>
                    <h1>Speed</h1>
                </Section>
                <Section>
                    <h1>game</h1>
                </Section>
            </main>
        </React.Fragment>
    );
};

export default Home;
