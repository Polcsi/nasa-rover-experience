import FixedSection from "@/components/FixedSection";
import { motion } from "framer-motion";
import { viewAnimation } from "@pages/home/sections/animations";
import { useTranslation } from "react-i18next";

const Section1 = () => {
    const { t } = useTranslation("rover");

    return (
        <FixedSection index={0}>
            <motion.div
                className="w-2/4 flex flex-col gap-7"
                initial="hidden"
                whileInView="visible"
                variants={viewAnimation}
            >
                <h1 className="poppins-bold text-5xl md:text-7xl leading-tight md:leading-[80px]">
                    {t("sections.1.title")}
                </h1>
                <p className="text-sm md:text-base">{t("sections.1.content")}</p>
            </motion.div>
        </FixedSection>
    );
};

export default Section1;
