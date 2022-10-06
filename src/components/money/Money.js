import React, {useEffect} from "react";
// i18n
import { useTranslation } from "react-i18next";
// components
import ChartList from "./ChartList";

export default function Money() {
  const { t } = useTranslation();


  return (
    <>
      <div>Money</div>
      <h2>{t('title')}</h2>
      <ChartList />
    </>
  );
}
