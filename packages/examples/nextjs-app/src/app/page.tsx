import { redirect } from "next/navigation";
import { i18nConfig } from "@/messages";

export default function HomePage() {
  // Redirect to default locale
  redirect(`/${i18nConfig.defaultLocale}`);
}
