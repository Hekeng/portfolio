export const SUPPORTED_LANGS = ["en", "de", "ru"] as const;

export type SupportedLng = (typeof SUPPORTED_LANGS)[number];

export const DEFAULT_LANG: SupportedLng = "en";

/**
 * Вспомогательная функция (понадобится позже), 
 * которая проверяет, поддерживаем ли мы такой язык
 */
export function isSupportedLang(lng: string): lng is SupportedLng {
  return SUPPORTED_LANGS.includes(lng as SupportedLng);
}

