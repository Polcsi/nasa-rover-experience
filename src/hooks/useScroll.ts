import React from "react";

const useScrollThree = () => {
    const [section, setSection] = React.useState<number>(0);
    const [rawScrollPosition, setRawScrollPosition] = React.useState<number>(0);

    React.useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;

            const newSection = Math.round(scrollY / window.innerHeight);

            React.startTransition(() => {
                setRawScrollPosition(scrollY / window.innerHeight);
            });

            React.startTransition(() => {
                setSection(newSection);
            });
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return [section, rawScrollPosition];
};

export default useScrollThree;
