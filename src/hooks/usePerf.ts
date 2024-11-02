import { useLocation } from "react-router-dom";

const usePerf = () => {
    const { hash } = useLocation();

    const isPerf = hash.includes("pref");

    return { isPerf };
};

export default usePerf;
