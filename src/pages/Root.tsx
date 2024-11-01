import React from "react";
import { Outlet } from "react-router-dom";
import PageLoading from "@pages/PageLoading";

const Root = () => {
  return (
    <React.Suspense fallback={<PageLoading />}>
      <Outlet />
    </React.Suspense>
  );
};

export default Root;
