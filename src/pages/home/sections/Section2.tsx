import Section from "@/components/Section";
import { Button } from "@nextui-org/button";
import { Link } from "react-router-dom";
import { PiHandGrabbingBold } from "react-icons/pi";
import { motion, Variants } from "framer-motion";
import { viewAnimation } from "@pages/home/Home";
import { useMarkerContext } from "@experience/MarkerContext";

const variants: Variants = {
    hidden: {
        opacity: 0,
        x: 30,
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

const Section2 = () => {
    const { activeMarker } = useMarkerContext();

    return (
        <Section
            contentProps={{
                className: "flex flex-row justify-between",
            }}
        >
            <motion.div initial="hidden" whileInView="visible" variants={viewAnimation} className="w-1/4 h-full">
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-3">
                            <h1 className="poppins-bold text-2xl md:text-5xl leading-tight md:leading-[60px]">
                                Meet Curiosity
                            </h1>
                            <hr />
                        </div>
                        <p className="text-sm">
                            Curiosity is a car-sized rover designed to explore the crater Gale on Mars as part of NASA's
                            Mars Science Laboratory mission. Curiosity was launched from Cape Canaveral on November 26,
                            2011, at 15:02 UTC and landed on Aeolis Palus inside Gale on Mars on August 6, 2012, 05:17
                            UTC.
                        </p>
                    </div>
                    <Link to="https://science.nasa.gov/mission/msl-curiosity/" className="w-full">
                        <Button>Learn more</Button>
                    </Link>
                </div>
            </motion.div>
            <motion.div
                className="absolute bottom-10 left-[50%] translate-x-[-50%] bg-2 py-1 px-5 rounded-full pb-2 flex justify-center items-center shadow-md"
                initial="hidden"
                whileInView="visible"
                variants={viewAnimation}
            >
                <motion.div
                    animate={{
                        x: ["0px", "10px", "-10px", "10px", "0px"],
                    }}
                    transition={{
                        duration: 1.2,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatDelay: 1.5,
                        delay: 2,
                    }}
                >
                    <PiHandGrabbingBold className="text-3 text-3xl" />
                </motion.div>
            </motion.div>
            <motion.div
                initial="hidden"
                whileInView="visible"
                variants={variants}
                className="bg-2 py-5 px-5 w-64 rounded-lg shadow-lg max-h-min"
            >
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-2">
                        <h1 className="poppins-medium text-2xl">{activeMarker.title}</h1>
                        <hr />
                    </div>
                    <p className="text-sm poppins-light">{activeMarker.description}</p>
                    <Button>Dismiss</Button>
                </div>
            </motion.div>
        </Section>
    );
};

export default Section2;