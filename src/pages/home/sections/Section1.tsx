import FixedSection from "@/components/FixedSection";
import { motion } from "framer-motion";
import { viewAnimation } from "@pages/home/sections/animations";

const Section1 = () => {
    return (
        <FixedSection index={0}>
            <motion.div
                className="w-2/4 flex flex-col gap-7"
                initial="hidden"
                whileInView="visible"
                variants={viewAnimation}
            >
                <h1 className="poppins-bold text-5xl md:text-7xl leading-tight md:leading-[80px]">
                    Mars Science Laboratory: Curiosity Rover
                </h1>
                <p className="text-sm md:text-base">
                    Part of NASA's Mars Science Laboratory mission, at the time of launch, Curiosity was the largest and
                    most capable rover ever sent to Mars at that time.
                </p>
            </motion.div>
        </FixedSection>
    );
};

export default Section1;
