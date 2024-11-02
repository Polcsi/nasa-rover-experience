import { useLocation } from "react-router-dom";

const useDebug = () => {
    const { hash } = useLocation();

    const isDebug = hash.includes("debug");

    return { isDebug };
};

export default useDebug;
