import React from "react";

type SectionProps = {
    children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const Section = (props: SectionProps) => {
    const { children, ...sectionProps } = props;

    return (
        <section {...sectionProps}>
            <div className="section-content">{children}</div>
        </section>
    );
};

export default Section;
