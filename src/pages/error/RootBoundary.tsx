import { lazy } from "react";
import { useTranslation } from "react-i18next";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
const ErrorPage = lazy(() => import("@/pages/error/ErrorPage"));

const RootBoundary = () => {
  const error: unknown = useRouteError();
  const { t } = useTranslation("error");

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <ErrorPage status={404} message={t("not-found")} />;
    }
  }

  return (
    <ErrorPage status={t("ooops")} message={t("unknown-error")} error={error} />
  );
};

export default RootBoundary;
