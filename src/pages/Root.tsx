import React from "react";
import { Outlet } from "react-router-dom";
import PageLoading from "@pages/PageLoading";
import Navbar from "@/components/Navbar";
import { NextUIProvider } from "@nextui-org/react";

const Root = () => {
    return (
        <NextUIProvider>
            <React.Suspense fallback={<PageLoading />}>
                <Navbar />
                <Outlet />
            </React.Suspense>
        </NextUIProvider>
    );
};

export default Root;
