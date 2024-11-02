import React from "react";

type SectionProps = {
    children: React.ReactNode;
    contentProps?: React.HTMLAttributes<HTMLDivElement>;
} & React.HTMLAttributes<HTMLDivElement>;

const Section = (props: SectionProps) => {
    const { children, contentProps, ...sectionProps } = props;

    return (
        <section {...sectionProps}>
            <div {...contentProps} className={`section-content ${contentProps?.className}`}>
                {children}
            </div>
        </section>
    );
};

export default Section;
