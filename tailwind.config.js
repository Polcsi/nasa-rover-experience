const { nextui } = require("@nextui-org/react");
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./node_modules/@nextui-org/theme/dist/components/(button|ripple|spinner).js",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                1: "#344966", // Indigo Dye
                first: "#344966",
                2: "#0D1821", // Rich Black
                second: "#0D1821",
                3: "#B4CDED", // Powder Blue
                third: "#B4CDED",
                4: "#F0F4EF", // Baby Powder
                fourth: "#F0F4EF",
                5: "#A26769", // Rose Taupe
                fifth: "#A26769",
            },
        },
    },
    plugins: [nextui()],
};
