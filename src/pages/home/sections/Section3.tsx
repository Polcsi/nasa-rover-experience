import FixedSection from "@/components/FixedSection";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { viewAnimation } from "@pages/home/sections/animations";
import KeyboardControls from "@keyboard/KeyboardControls";

const Section3 = () => {
    const { t } = useTranslation("rover");

    return (
        <FixedSection
            index={2}
            className="items-end"
            contentProps={{
                className: "py-10",
            }}
        >
            <motion.div
                className="text-center flex flex-col gap-3 pointer-events-auto select-none"
                initial="hidden"
                whileInView="visible"
                variants={viewAnimation}
            >
                <h1 className="poppins-semibold uppercase tracking-wider">{t("sections.3.explore-mars")}</h1>
                <KeyboardControls />
            </motion.div>
        </FixedSection>
    );
};

export default Section3;
