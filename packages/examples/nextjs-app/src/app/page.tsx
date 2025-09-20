import { redirect } from "next/navigation";
import { i18nConfig } from "../../i18nconfig";

export default function HomePage() {
  // Redirect to default locale
  redirect(`/${i18nConfig.defaultLocale}`);
}
