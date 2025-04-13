import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enAU from "~/locales/en-AU.json";
import ptBR from "~/locales/pt-BR.json";

export const defaultNS = "general";
export const resources = {
    "en-AU": enAU,
    "pt-BR": ptBR,
} as const;

await i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        defaultNS,
        lng: "en-AU",
        fallbackLng: "en-AU",
        interpolation: {
            escapeValue: false,
        },
    });
