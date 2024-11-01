import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

type IErrorPageProps =
  | {
      content?: React.ReactNode;
      status?: never;
      message?: never;
      error?: never;
    }
  | {
      content?: never;
      status: number | string;
      message: string;
      error?: unknown;
    };

const ErrorPage = ({ status, message, error, content }: IErrorPageProps) => {
  const { t } = useTranslation("error");

  return (
    <main>
      <h1>
        {status} {message}
      </h1>
      {content}
      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
      <Link to="/">{t("back-to-home")}</Link>
    </main>
  );
};

export default ErrorPage;
