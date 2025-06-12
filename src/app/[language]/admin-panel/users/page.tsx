import type { Metadata } from "next";
import { getServerTranslation } from "@/services/i18n";
import Users from "./page-content";

type Props = {
  params: { language: string };
};

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const { t } = await getServerTranslation(
//     params.language,
//     "admin-panel-users"
//   );

//   return {
//     title: t("title"),
//   };
// }


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // <-- super-lightweight JSON import, no full i18next init
  const locale = await import(
    `@/services/i18n/locales/${params.language}/admin-panel-users.json`
  );
  return {
    title: locale.default.title,    // or however your JSON shapes it
  };
}

export default Users;
