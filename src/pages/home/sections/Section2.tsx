import { Button } from "@nextui-org/button";
import { Link } from "react-router-dom";
import { PiHandGrabbingBold } from "react-icons/pi";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { viewAnimation } from "@pages/home/sections/animations";
import { useMarkerContext } from "@/pages/home/experience/marker/MarkerContext";
import FixedSection from "@/components/FixedSection";
import { useTranslation } from "react-i18next";

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
    const { activeMarker, resetMarker } = useMarkerContext();
    const { t } = useTranslation();

    return (
        <FixedSection
            index={1}
            contentProps={{
                className: "flex flex-row justify-between",
            }}
        >
            <motion.div initial="hidden" whileInView="visible" variants={viewAnimation} className="w-1/4 h-full">
                <div className="flex flex-col gap-5 pointer-events-auto">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-3">
                            <h1 className="poppins-bold text-2xl md:text-5xl leading-tight md:leading-[60px]">
                                {t("rover:sections.2.title")}
                            </h1>
                            <hr />
                        </div>
                        <p className="text-sm ">{t("rover:sections.2.content")}</p>
                    </div>
                    <Link
                        to="https://science.nasa.gov/mission/mars-2020-perseverance/rover-components/"
                        className="outline-none w-min"
                        target="_blank"
                    >
                        <Button type="button">{t("common:learn-more")}</Button>
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
            <AnimatePresence>
                {activeMarker.id !== 0 ? (
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        exit="hidden"
                        variants={variants}
                        className="bg-2 py-5 px-5 w-64 rounded-lg shadow-lg h-min pointer-events-auto"
                    >
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-col gap-2">
                                <h1 className="poppins-medium text-2xl">{activeMarker.title}</h1>
                                <hr />
                            </div>
                            <p className="text-sm poppins-light">{activeMarker.description}</p>
                            <Button onClick={resetMarker}>{t("common:dismiss")}</Button>
                        </div>
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </FixedSection>
    );
};

export default Section2;
