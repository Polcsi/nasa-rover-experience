/// <reference types="vite/client" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src/"),
            "@public": path.resolve(__dirname, "./public/"),
            "@pages": path.resolve(__dirname, "./src/pages/"),
            "@assets": path.resolve(__dirname, "./src/assets/"),
            "@components": path.resolve(__dirname, "./src/components/"),
            "@hooks": path.resolve(__dirname, "./src/hooks/"),
            "@experience": path.resolve(__dirname, "./src/pages/home/experience/"),
            "@marker": path.resolve(__dirname, "./src/pages/home/experience/marker/"),
            "@keyboard": path.resolve(__dirname, "./src/pages/home/experience/keyboard/"),
        },
    },
    plugins: [react()],
});
