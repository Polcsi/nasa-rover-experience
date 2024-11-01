/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                1: "#344966", // Indigo Dye
                2: "#0D1821", // Rich Black
                3: "#B4CDED", // Powder Blue
                4: "#F0F4EF", // Baby Powder
                5: "#A26769", // Rose Taupe
            },
        },
    },
    plugins: [],
};
