import React from "react";
import { useThree } from "@react-three/fiber";

const useScrollThree = () => {
    const { size } = useThree();
    const [section, setSection] = React.useState<number>(0);

    React.useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;

            const newSection = Math.round(scrollY / size.height);

            React.startTransition(() => {
                setSection(newSection);
            });
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [size]);

    return [section];
};

export default useScrollThree;
