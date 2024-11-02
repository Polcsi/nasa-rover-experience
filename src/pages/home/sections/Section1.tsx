import Section from "@/components/Section";
import { motion } from "framer-motion";
import { viewAnimation } from "@pages/home/Home";

const Section1 = () => {
    return (
        <Section>
            <motion.div
                className="w-2/4 flex flex-col gap-7"
                initial="hidden"
                whileInView="visible"
                variants={viewAnimation}
                viewport={{ margin: `-${window.innerHeight / 2}px` }}
            >
                <h1 className="poppins-bold text-5xl md:text-7xl leading-tight md:leading-[80px]">
                    Mars Science Laboratory: Curiosity Rover
                </h1>
                <p className="text-sm md:text-base">
                    Part of NASA's Mars Science Laboratory mission, at the time of launch, Curiosity was the largest and
                    most capable rover ever sent to Mars at that time.
                </p>
            </motion.div>
        </Section>
    );
};

export default Section1;
