import { useTranslation } from "react-i18next";

const PageLoading = () => {
  const { t } = useTranslation();

  return <div>{t("loading")}</div>;
};

export default PageLoading;
