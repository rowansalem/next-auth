"use client";

import { useParams } from "next/navigation";
import { fallbackLng } from "./config";

function useLanguage() {
  const params = useParams();

  return (
    (Array.isArray(params?.language)
      ? params?.language[0]
      : params?.language) || fallbackLng
  );
}

export default useLanguage;
