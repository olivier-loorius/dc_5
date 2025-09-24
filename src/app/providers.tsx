import { NextIntlClientProvider } from "next-intl";
import { getMessages, getLocale } from "next-intl/server";

export default async function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  const [messages, locale] = await Promise.all([getMessages(), getLocale()]);
  return (
    <NextIntlClientProvider
      locale={locale}
      timeZone="Europe/Paris"
      messages={messages}
    >
      {children}
    </NextIntlClientProvider>
  );
}
