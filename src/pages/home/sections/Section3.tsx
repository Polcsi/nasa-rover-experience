import FixedSection from "@/components/FixedSection";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { viewAnimation } from "@pages/home/sections/animations";

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
                className="text-center flex flex-col gap-3"
                initial="hidden"
                whileInView="visible"
                variants={viewAnimation}
            >
                <h1 className="poppins-semibold uppercase tracking-wider">{t("sections.3.explore-mars")}</h1>
                <div className="flex justify-center">
                    <div className="flex flex-col gap-2">
                        <div className="key self-center">w</div>
                        <div className="flex flex-row gap-2">
                            <div className="key">a</div>
                            <div className="key">s</div>
                            <div className="key">d</div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </FixedSection>
    );
};

export default Section3;
