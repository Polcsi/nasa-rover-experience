import useDebug from "@/hooks/useDebug";
import usePerf from "@/hooks/usePerf";
import { Grid } from "@react-three/drei";
import { useControls, folder } from "leva";
import { Perf } from "r3f-perf";

const Helpers = () => {
    const { isDebug } = useDebug();
    const { isPerf } = usePerf();

    const {
        showGrid,
        showPerf,
        perfPosition,
        showAxes,
        axesSize,
        cellSize,
        cellTickness,
        cellColor,
        sectionSize,
        sectionTickness,
        sectionColor,
    } = useControls("Helpers", {
        axesHelper: folder(
            {
                showAxes: {
                    value: false,
                    label: "Show",
                },
                axesSize: {
                    label: "Size",
                    value: 10,
                    step: 1,
                    min: 1,
                    max: 100,
                },
            },
            { collapsed: true },
        ),
        grid: folder(
            {
                showGrid: {
                    value: true,
                    label: "Show Grid",
                },
                cellSize: {
                    value: 0.5,
                    min: 0,
                    max: 10,
                    step: 0.01,
                    label: "Cell Size",
                },
                cellTickness: {
                    value: 0.5,
                    min: 0,
                    max: 2,
                    step: 0.1,
                    label: "Cell Thickness",
                },
                cellColor: {
                    value: "#6f6f6f",
                    label: "Cell Color",
                },
                sectionSize: {
                    value: 3,
                    min: 0,
                    max: 10,
                    step: 0.01,
                    label: "Section Size",
                },
                sectionTickness: {
                    value: 1,
                    min: 0,
                    max: 2,
                    step: 0.1,
                    label: "Section Thickness",
                },
                sectionColor: {
                    value: "#9d4b4b",
                    label: "Section Color",
                },
            },
            { collapsed: true },
        ),
        preformanceMonitor: folder(
            {
                showPerf: {
                    value: true,
                    label: "Show Performance Monitor",
                },
                perfPosition: {
                    value: "bottom-left",
                    options: ["top-left", "top-right", "bottom-left", "bottom-right"],
                    label: "Performance Monitor Position",
                },
            },
            { collapsed: true },
        ),
    });

    return (
        <>
            {showPerf && isPerf ? <Perf position={perfPosition} /> : null}
            <axesHelper visible={showAxes} args={[axesSize]} />

            <Grid
                visible={isDebug && showGrid}
                position={[0, -0.01, 0]}
                args={[10.5, 10.5]}
                cellSize={cellSize}
                cellThickness={cellTickness}
                cellColor={cellColor}
                sectionSize={sectionSize}
                sectionThickness={sectionTickness}
                sectionColor={sectionColor}
                fadeDistance={50}
                fadeStrength={1}
                followCamera={false}
                infiniteGrid={true}
            />
        </>
    );
};

export default Helpers;
