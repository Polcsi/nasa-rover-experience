import useScrollThree from "@/hooks/useScroll";
import React from "react";
import { twMerge } from "tailwind-merge";

type FixedSectionProps = {
    children?: React.ReactNode;
    contentProps?: React.HTMLAttributes<HTMLDivElement>;
    index: number;
} & React.HTMLAttributes<HTMLDivElement>;

const FixedSection = (props: FixedSectionProps) => {
    const { children, index, contentProps, ...sectionProps } = props;

    const [section] = useScrollThree();
    const containerRef = React.useRef<HTMLDivElement>(null);

    return (
        <div
            ref={containerRef}
            {...sectionProps}
            className={twMerge(
                "fixed z-20 text-4 w-full flex justify-center items-center h-screen transition-all duration-75 ease-in-out bg-transparent pointer-events-none",
                sectionProps?.className,
            )}
            style={{
                display: section !== index ? "none" : "flex",
            }}
        >
            <div {...contentProps} className={`section-content ${contentProps?.className}`}>
                {children}
            </div>
        </div>
    );
};

export default FixedSection;
