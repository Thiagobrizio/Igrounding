import i18n from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";

import enAU from "~/locales/en-AU.json";
import ptBR from "~/locales/pt-BR.json";

export const defaultNS = "general";
export const resources = {
    "en-AU": enAU,
    "pt-BR": ptBR,
} as const;

export default function I18nProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const instance = i18n.createInstance();

    instance.use(initReactI18next).init({
        resources,
        defaultNS,
        lng: "en-AU",
        fallbackLng: "en-AU",
        interpolation: {
            escapeValue: false,
        },
    });

    return (
        <I18nextProvider defaultNS={defaultNS} i18n={instance}>
            {children}
        </I18nextProvider>
    );
}
