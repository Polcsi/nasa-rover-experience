import { type Variants } from "framer-motion";

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
